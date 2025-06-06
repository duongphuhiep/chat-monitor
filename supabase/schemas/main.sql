CREATE SCHEMA chat_monitor;
-- Create the "conversation" table in the "chat_monitor" schema
CREATE TABLE chat_monitor.conversation (
	id BIGSERIAL PRIMARY KEY,
	subject TEXT NOT NULL,
	is_archived BOOLEAN DEFAULT FALSE,
	is_public BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create the "participation" table in the "chat_monitor" schema
CREATE TABLE chat_monitor.participation (
	id BIGSERIAL PRIMARY KEY,
	user_id UUID NOT NULL,
	conversation_id BIGINT NOT NULL,
	mute_notification BOOLEAN DEFAULT FALSE,
	display_name TEXT,
	last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES chat_monitor.conversation (id) ON DELETE CASCADE,
	CONSTRAINT uc_participation_user_conversation UNIQUE (user_id, conversation_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);
-- Create the "invitation" table in the "chat_monitor" schema
CREATE TABLE chat_monitor.invitation (
	id BIGSERIAL PRIMARY KEY,
	conversation_id BIGINT NOT NULL,
	user_id UUID NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES chat_monitor.conversation (id) ON DELETE CASCADE,
	CONSTRAINT uc_invitation_user_conversation UNIQUE (user_id, conversation_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);
-- Create the "message" table in the "chat_monitor" schema
CREATE TABLE chat_monitor.message (
	id BIGSERIAL PRIMARY KEY,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	content TEXT NOT NULL,
	conversation_id BIGINT NOT NULL,
	is_deleted_at TIMESTAMP,
	last_edited_at TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES chat_monitor.conversation (id) ON DELETE CASCADE
);
-- select * from get_conversations('11111111-1111-1111-1111-111111111111')
create or replace function get_conversations(participant_user_id uuid) returns table (
		id bigint,
		subject TEXT,
		is_archived BOOLEAN,
		is_public BOOLEAN,
		created_at TIMESTAMP,
		updated_at TIMESTAMP,
		participation_id bigint,
		mute_notification BOOLEAN,
		display_name TEXT,
		participation_created_at TIMESTAMP,
		participation_updated_at TIMESTAMP,
		last_message_id bigint,
		last_message_date TIMESTAMP,
		last_message_content TEXT
	) as $$ begin return query
select c.*,
	p.id as participation_id,
	p.mute_notification,
	p.display_name,
	p.created_at as participation_created_at,
	p.updated_at as participation_updated_at,
	m.id as last_message_id,
	m.date as last_message_date,
	m.content as last_message_content
from chat_monitor.conversation c
	join chat_monitor.participation p on c.id = p.conversation_id
	LEFT JOIN LATERAL (
		select *
		from chat_monitor.message m
		where m.conversation_id = c.id
		order by date desc
		limit 1
	) m ON true
where p.user_id = participant_user_id;
end;
$$ language plpgsql stable;
grant usage on schema chat_monitor to authenticated;
grant select on chat_monitor.conversation to authenticated;
grant select on chat_monitor.participation to authenticated;
grant select on chat_monitor.message to authenticated;