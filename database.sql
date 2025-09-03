-- create database
CREATE DATABASE IF NOT EXISTS chatbot_db;
USE chatbot_db;

-- orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(50)
);

INSERT INTO orders (status) VALUES
('Pending'),
('Shipped'),
('Delivered');

-- faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question VARCHAR(255),
  answer TEXT
);

INSERT INTO faqs (question, answer) VALUES
('refund policy', 'You can request a refund within 7 days of delivery.'),
('shipping time', 'Shipping usually takes 3-5 business days.'),
('payment methods', 'We accept Cash on Delivery, Credit Card, and Bank Transfer.');
