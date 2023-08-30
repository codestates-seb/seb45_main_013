INSERT INTO "MEMBER" (address, create_at, display_name, email, is_pet_sitter, last_modified_at, name, password, phone, status) VALUES
('서울시 강남구 강남1로 1 101호', NOW(), '백구아빠', 'test1@email.com', false, NOW(), '홍길동',  'password1234', '010-1111-1111', 'MEMBER_ACTIVE'),
('대전광역시 은행동 1로 2', NOW(), '냥이집사', 'test2@email.com', false, NOW(), '김철수',  'password1234', '010-2222-2222', 'MEMBER_ACTIVE'),
('대구광역시 신천로 3로 4', NOW(), '톰캣', 'test3@email.com', false, NOW(), '박영희',  'password1234', '010-3333-3333', 'MEMBER_ACTIVE'),
('부산광역시 해운대 101-1', NOW(), '톰과제리', 'test4@email.com', false, NOW(), '황철',  'password1234', '010-4444-4444', 'MEMBER_ACTIVE'),
('광주광역시 광주로 13로 8', NOW(), '하얀마음', 'test5@email.com', false, NOW(), '최미라',  'password1234', '010-5555-5555', 'MEMBER_ACTIVE'),
('인천광역시 인청로 7번길 9', NOW(), '황구', 'test6@email.com', false, NOW(), '유재석',  'password1234', '010-6666-6666', 'MEMBER_ACTIVE');

INSERT INTO "PETSITTER" (address, create_at, display_name, email, is_pet_sitter, last_modified_at, name, password, phone, POSSIBLE_DAY, POSSIBLE_LOCATION , POSSIBLE_PET_TYPE, POSSIBLE_TIME_END,  POSSIBLE_TIME_START, STATUS) VALUES
('서울시 강서구 강서로 1', NOW(), '펫선생', 'test7@email.com', true, NOW(), '강형욱',  'password1234', '010-7777-7777','월화수목금', '서울시','개고양이','18:00','09:00', 'PETSITTER_ACTIVE'),
('대전광역시 대전역로1 2', NOW(), '멍데디', 'test8@email.com', true, NOW(), '정형돈',  'password1234', '010-8888-8888','월수목','대전광역시', '개','12:00','06:00', 'PETSITTER_ACTIVE'),
('대구광역시 대구역로3 4', NOW(), '냥선생', 'test9@email.com', true, NOW(), '노홍철',  'password1234', '010-9999-9999','월수금','대구광역시', '개고양이','15:00','10:00', 'PETSITTER_ACTIVE'),
('부산광역시 부산역로5 4', NOW(), 'jhon', 'test10@email.com', true, NOW(), '정준하',  'password1234', '010-0000-0000','수목금','부산광역시', '고양이','13:00','11:00', 'PETSITTER_ACTIVE'),
('광주광역시 광주역로2 2', NOW(), 'haha', 'test11@email.com', true, NOW(), '하하',  'password1234', '010-1111-2222','월토일','광주광역시', '개','20:00','10:00', 'PETSITTER_ACTIVE'),
('인천광역시 인천역로8 8', NOW(), 'park', 'test12@email.com', true, NOW(), '박명수',  'password1234', '010-1111-3333','월화토일', '인천광역시','개고양이','24:00','18:00', 'PETSITTER_ACTIVE');


INSERT INTO "PET"(AGE,CREATED_AT,LAST_MODIFIED_AT,NAME,PHOTO,SPECIES,TYPE,WEIGHT,MEMBER_ID) VALUES
(1,NOW(),NOW(),'초코','s3주소','푸들','개',5,1),
(4,NOW(),NOW(),'딸기','s3주소','진돗개','개',15,1),

(5,NOW(),NOW(),'바닐라','s3주소','허스키','개',20,2),
(4,NOW(),NOW(),'코코','s3주소','페르시안','고양이',4,2),

(2,NOW(),NOW(),'네로','s3주소','샴','고양이',6,3),
(3,NOW(),NOW(),'바둑이','s3주소','믹스','개',10,3),

(5,NOW(),NOW(),'나비','s3주소','믹스','고양이',3,4),
(8,NOW(),NOW(),'벌','s3주소','렉돌','고양이',13,4),
(9,NOW(),NOW(),'백구','s3주소','치와와','개',4,4),
(13,NOW(),NOW(),'황구','s3주소','말티즈','개',4,4),

(1,NOW(),NOW(),'치즈','s3주소','아메리칸숏','고양이',3,5),
(2,NOW(),NOW(),'깜돌','s3주소','믹스','개',17,5),
(5,NOW(),NOW(),'허니','s3주소','노르웨이숲','고양이',12,5),

(2,NOW(),NOW(),'별이','s3주소','섀퍼트','개',18,6),
(7,NOW(),NOW(),'달이','s3주소','스코티시폴드','고양이',4,6),
(2,NOW(),NOW(),'햇님이','s3주소','시츄','개',5,6),
(9,NOW(),NOW(),'루루','s3주소','코숏','고양이',5,6);

INSERT INTO "RESERVATION" (BODY,CREATED_AT,LAST_MODIFIED_AT,PROGRESS,RESERVATION_TIME_END,RESERVATION_TIME_START,MEMBER_ID,PETSITTER_ID) VALUES
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-01 18:00', '2023-09-01 09:00',1,1),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-04 12:00', '2023-09-04 08:00',1,2),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-04 15:00', '2023-09-04 10:00',1,3),

('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-06 13:00', '2023-09-06 11:00',2,4),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-09 20:00', '2023-09-09 10:00',2,5),

('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-18 20:00', '2023-09-18 18:00',3,6),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-07 14:00', '2023-09-07 10:00',3,1),

('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-06 12:00', '2023-09-06 09:00',4,2),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-06 12:00', '2023-09-06 10:00',4,3),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-07 13:00', '2023-09-07 11:00',4,4),

('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-10 20:00', '2023-09-10 15:00',5,5),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-19 24:00', '2023-09-19 20:00',5,6),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-08 13:00', '2023-09-08 09:00',5,1),

('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-07 12:00', '2023-09-07 09:00',6,2),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-08 13:00', '2023-09-08 10:00',6,3),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-13 13:00', '2023-09-13 11:00',6,4),
('test Body', NOW(), NOW(), 'RESERVATION_REQUEST', '2023-09-23 24:00', '2023-09-23 18:00',6,6);

INSERT INTO "RESERVATION_PET" (RESERVATION_ID,PET_ID) VALUES
(1,1),(1,2),
(2,2),(2,2),
(3,2),(3,2),

(4,4),
(5,3),

(6,5),(6,6),
(7,5),(7,6),

(8,9),(8,10),
(9,7),(9,8),(9,9),(9,10),
(10,7),(10,8),

(11,12),
(12,11),(12,12),(12,13),
(13,12),

(14,14),(14,15),(14,16),(14,17),
(15,14),(15,16),(15,17),
(16,15),
(17,16),(17,17);