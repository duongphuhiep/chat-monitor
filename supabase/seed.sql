-- 1. Insert a test user into auth.users
INSERT INTO auth.users (
          instance_id,
          id,
          aud,
          role,
          email,
          encrypted_password,
          email_confirmed_at,
          recovery_sent_at,
          last_sign_in_at,
          raw_app_meta_data,
          raw_user_meta_data,
          created_at,
          updated_at,
          confirmation_token,
          email_change,
          email_change_token_new,
          recovery_token
     )
VALUES (
          '00000000-0000-0000-0000-000000000000',
          '11111111-1111-1111-1111-111111111111',
          -- fixed UUID for reference
          'authenticated',
          'authenticated',
          'minh@email.com',
          crypt('aaaaaa', gen_salt('bf')),
          current_timestamp,
          current_timestamp,
          current_timestamp,
          '{"provider":"email","providers":["email"]}',
          '{}',
          current_timestamp,
          current_timestamp,
          '',
          '',
          '',
          ''
     ),
     (
          '00000000-0000-0000-0000-000000000000',
          '22222222-2222-2222-2222-222222222222',
          -- fixed UUID for reference
          'authenticated',
          'authenticated',
          'dani@mail.com',
          crypt('aaaaaa', gen_salt('bf')),
          current_timestamp,
          current_timestamp,
          current_timestamp,
          '{"provider":"email","providers":["email"]}',
          '{}',
          current_timestamp,
          current_timestamp,
          '',
          '',
          '',
          ''
     ),
     (
          '00000000-0000-0000-0000-000000000000',
          '33333333-3333-3333-3333-333333333333',
          -- fixed UUID for reference
          'authenticated',
          'authenticated',
          'julia@mail.com',
          crypt('aaaaaa', gen_salt('bf')),
          current_timestamp,
          current_timestamp,
          current_timestamp,
          '{"provider":"email","providers":["email"]}',
          '{}',
          current_timestamp,
          current_timestamp,
          '',
          '',
          '',
          ''
     ),
     (
          '00000000-0000-0000-0000-000000000000',
          '44444444-4444-4444-4444-444444444444',
          -- fixed UUID for reference
          'authenticated',
          'authenticated',
          'logan@email.com',
          crypt('aaaaaa', gen_salt('bf')),
          current_timestamp,
          current_timestamp,
          current_timestamp,
          '{"provider":"email","providers":["email"]}',
          '{}',
          current_timestamp,
          current_timestamp,
          '',
          '',
          '',
          ''
     ),
     (
          '00000000-0000-0000-0000-000000000000',
          '55555555-5555-5555-5555-555555555555',
          -- fixed UUID for reference
          'authenticated',
          'authenticated',
          'leila@email.com',
          crypt('aaaaaa', gen_salt('bf')),
          current_timestamp,
          current_timestamp,
          current_timestamp,
          '{"provider":"email","providers":["email"]}',
          '{}',
          current_timestamp,
          current_timestamp,
          '',
          '',
          '',
          ''
     );
-- 2. Insert identity for the user (required for email login)
INSERT INTO auth.identities (
          id,
          user_id,
          provider_id,
          identity_data,
          provider,
          last_sign_in_at,
          created_at,
          updated_at
     )
VALUES (
          '11111111-1111-1111-1111-111111111111',
          -- same as user id
          '11111111-1111-1111-1111-111111111111',
          '11111111-1111-1111-1111-111111111111',
          '{"sub":"11111111-1111-1111-1111-111111111111","email":"minh@email.com"}',
          'email',
          current_timestamp,
          current_timestamp,
          current_timestamp
     ),
     (
          '22222222-2222-2222-2222-222222222222',
          -- same as user id
          '22222222-2222-2222-2222-222222222222',
          '22222222-2222-2222-2222-222222222222',
          '{"sub":"22222222-2222-2222-2222-222222222222","email":"dani@mail.com"}',
          'email',
          current_timestamp,
          current_timestamp,
          current_timestamp
     ),
     (
          '33333333-3333-3333-3333-333333333333',
          -- same as user id
          '33333333-3333-3333-3333-333333333333',
          '33333333-3333-3333-3333-333333333333',
          '{"sub":"33333333-3333-3333-3333-333333333333","email":"julia@mail.com"}',
          'email',
          current_timestamp,
          current_timestamp,
          current_timestamp
     ),
     (
          '44444444-4444-4444-4444-444444444444',
          -- same as user id
          '44444444-4444-4444-4444-444444444444',
          '44444444-4444-4444-4444-444444444444',
          '{"sub":"44444444-4444-4444-4444-444444444444","email":"logan@email.com"}',
          'email',
          current_timestamp,
          current_timestamp,
          current_timestamp
     ),
     (
          '55555555-5555-5555-5555-555555555555',
          -- same as user id
          '55555555-5555-5555-5555-555555555555',
          '55555555-5555-5555-5555-555555555555',
          '{"sub":"55555555-5555-5555-5555-555555555555","email":"leila@email.com"}',
          'email',
          current_timestamp,
          current_timestamp,
          current_timestamp
     );
-- Insert random conversations
INSERT INTO chat_monitor.conversation (subject, is_archived, is_public)
VALUES ('Project Discussion', FALSE, TRUE),
     ('Team Meeting', FALSE, FALSE),
     ('Casual Chat', FALSE, TRUE),
     ('Bug Fixing', TRUE, FALSE),
     ('Feature Planning', FALSE, FALSE);
-- Insert additional conversations for Minh
INSERT INTO chat_monitor.conversation (subject, is_archived, is_public)
VALUES ('Minh''s Personal Notes', FALSE, FALSE),
     ('Minh''s Team Updates', FALSE, TRUE);
-- Insert random participations
INSERT INTO chat_monitor.participation (
          user_id,
          conversation_id,
          mute_notification,
          display_name
     )
VALUES (
          '11111111-1111-1111-1111-111111111111',
          1,
          FALSE,
          'Minh'
     ),
     (
          '22222222-2222-2222-2222-222222222222',
          1,
          FALSE,
          'Dani'
     ),
     (
          '33333333-3333-3333-3333-333333333333',
          2,
          TRUE,
          'Julia'
     ),
     (
          '44444444-4444-4444-4444-444444444444',
          2,
          FALSE,
          'Logan'
     ),
     (
          '55555555-5555-5555-5555-555555555555',
          3,
          FALSE,
          'Leila'
     ),
     (
          '11111111-1111-1111-1111-111111111111',
          3,
          TRUE,
          'Minh'
     ),
     (
          '22222222-2222-2222-2222-222222222222',
          4,
          FALSE,
          'Dani'
     ),
     (
          '33333333-3333-3333-3333-333333333333',
          5,
          FALSE,
          'Julia'
     ),
     (
          '11111111-1111-1111-1111-111111111111',
          6,
          FALSE,
          'Minh'
     ),
     (
          '11111111-1111-1111-1111-111111111111',
          7,
          FALSE,
          'Minh'
     );
-- Insert random invitations
INSERT INTO chat_monitor.invitation (conversation_id, user_id)
VALUES (1, '33333333-3333-3333-3333-333333333333'),
     (2, '55555555-5555-5555-5555-555555555555'),
     (3, '44444444-4444-4444-4444-444444444444'),
     (4, '11111111-1111-1111-1111-111111111111'),
     (5, '22222222-2222-2222-2222-222222222222');
-- Insert random messages
INSERT INTO chat_monitor.message (content, conversation_id)
VALUES ('Hello everyone!', 1),
     ('Let''s discuss the project timeline.', 1),
     ('Meeting scheduled for tomorrow.', 2),
     ('Can we reschedule the meeting?', 2),
     ('What''s the status of the bug fix?', 4),
     ('I have an idea for a new feature.', 5),
     ('Sounds good to me!', 3),
     ('Let''s catch up later.', 3),
     ('Here are my personal notes for the project.', 6),
     ('Remember to review the timeline.', 6),
     ('Team, please share your updates here.', 7),
     (
          'I''ll start with my progress on the feature.',
          7
     ),
     ('Great work on the bug fixes!', 1),
     ('Let''s finalize the timeline by tomorrow.', 1),
     ('Meeting postponed to next week.', 2),
     ('Please confirm your availability.', 2),
     ('The bug fix is almost complete.', 4),
     ('Let''s discuss the new feature in detail.', 5),
     ('I''ll share the design mockups soon.', 5),
     ('Looking forward to catching up!', 3),
     ('Let''s plan a team outing.', 3);