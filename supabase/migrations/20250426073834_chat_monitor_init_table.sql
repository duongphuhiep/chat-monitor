-- Create the "conversation" table in the "chat_monitor" schema
CREATE TABLE chat_monitor.conversation
(
	id BIGSERIAL PRIMARY KEY,
	subject TEXT NOT NULL,
	is_archived BOOLEAN DEFAULT FALSE,
	is_public BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the "participation" table in the "chat_monitor" schema
CREATE TABLE chat_monitor.participation
(
	id BIGSERIAL PRIMARY KEY,
	user_id UUID NOT NULL,
	conversation_id BIGINT NOT NULL,
	mute_notification BOOLEAN DEFAULT FALSE,
	display_name TEXT,
	last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES chat_monitor.conversation (id) ON DELETE CASCADE,
	CONSTRAINT uc_user_conversation UNIQUE (user_id, conversation_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Create the "invitation" table in the "chat_monitor" schema
CREATE TABLE chat_monitor.invitation
(
	id BIGSERIAL PRIMARY KEY,
	conversation_id BIGINT NOT NULL,
	user_id UUID NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES chat_monitor.conversation (id) ON DELETE CASCADE,
	CONSTRAINT uc_user_conversation UNIQUE (user_id, conversation_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Create the "message" table in the "chat_monitor" schema
CREATE TABLE chat_monitor.message
(
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
