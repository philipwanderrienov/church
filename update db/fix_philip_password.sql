-- Ensure user philip can login with password "password"
-- Database column name: passwordhash

UPDATE congregations
SET
  username = 'philip',
  passwordhash = '$2a$10$7w4Y9n1qR4M7gJ2m4qfQ5e9m1XK6Jp9X0w1vN9h2nq6g3fQeYQ1bG'
WHERE LOWER(username) = 'philip' OR LOWER(fullname) = 'philip';
