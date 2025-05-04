-- select * from get_conversations('11111111-1111-1111-1111-111111111111')

create or replace function get_conversations(participant_user_id uuid)
returns table (
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
) as $$
begin
  return query
  select 
    c.*, 
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
    where m.conversation_id=c.id 
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
