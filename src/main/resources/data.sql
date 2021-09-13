INSERT INTO roles (id, role) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER'), (3, 'ROLE_ANY');
INSERT INTO users (id, username, password, email) VALUES (1, 'admin', '$2a$10$5.oNUSlM03ccr4RLXFGWSOU1XG.CCNwmjJ1Xoh80B1BqRKAo4aHlC', 'admin@mail.ru');
INSERT INTO users_roles VALUES (1, 1);
