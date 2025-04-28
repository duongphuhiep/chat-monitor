-- 1. Insert a test user into auth.users
INSERT INTO auth.users
    (
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
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        '11111111-1111-1111-1111-111111111111', -- fixed UUID for reference
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
        '22222222-2222-2222-2222-222222222222', -- fixed UUID for reference
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
        '33333333-3333-3333-3333-333333333333', -- fixed UUID for reference
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
        '44444444-4444-4444-4444-444444444444', -- fixed UUID for reference
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
        '55555555-5555-5555-5555-555555555555', -- fixed UUID for reference
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
INSERT INTO auth.identities
    (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
    )
VALUES
    (
        '11111111-1111-1111-1111-111111111111', -- same as user id
        '11111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111',
        '{"sub":"11111111-1111-1111-1111-111111111111","email":"minh@email.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    ),
    (
        '22222222-2222-2222-2222-222222222222', -- same as user id
        '22222222-2222-2222-2222-222222222222',
        '22222222-2222-2222-2222-222222222222',
        '{"sub":"22222222-2222-2222-2222-222222222222","email":"dani@mail.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    ),
    (
        '33333333-3333-3333-3333-333333333333', -- same as user id
        '33333333-3333-3333-3333-333333333333',
        '33333333-3333-3333-3333-333333333333',
        '{"sub":"33333333-3333-3333-3333-333333333333","email":"julia@mail.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    ),
    (
        '44444444-4444-4444-4444-444444444444', -- same as user id
        '44444444-4444-4444-4444-444444444444',
        '44444444-4444-4444-4444-444444444444',
        '{"sub":"44444444-4444-4444-4444-444444444444","email":"logan@email.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    ),
    (
        '55555555-5555-5555-5555-555555555555', -- same as user id
        '55555555-5555-5555-5555-555555555555',
        '55555555-5555-5555-5555-555555555555',
        '{"sub":"55555555-5555-5555-5555-555555555555","email":"leila@email.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    );
