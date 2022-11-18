CREATE DATABASE wizgarden;

CREATE TABLE user_accounts(
    firstname text not null,   
	 lastname text not null,	
    displayname text NOT NULL, 
    userpassword text NOT NULL,   
    userlevel int not NULL);

CREATE TABLE users_details(
    emaillAddress text UNIQUE PRIMARY KEY,
    parentsName text NOT NULL,
    password text NOT NULL,
    mobileNumber text NOT NULL,
    childsName text NOT NULL,
    childsLevel text NOT NULL,
    interestedSubjects text NOT NULL
    
);

CREATE TABLE english_lessons(
    lesson_id text UNIQUE,  
    lesson_level text,
    lesson_day text,
    lesson_time text,
    PRIMARY KEY ("lesson_id")
);

INSERT INTO english_lessons(
    lesson_id, lesson_level, lesson_day, lesson_time) 
    VALUES ('EL1', 'Primary 1', 'Saturday', '9am-10am'), 
    ('EL2', 'Primary 2', 'Saturday', '11am-12pm'), 
    ('EL3', 'Primary 3', 'Saturday', '1pm-2pm'), 
    ('EL4', 'Primary 4', 'Saturday', '3pm-4pm'), 
    ('EL5', 'Primary 5', 'Saturday', '4pm-5pm'), 
    ('EL6', 'Primary 6', 'Saturday', '6pm-7pm');


CREATE TABLE chinese_lessons(
    lesson_id text UNIQUE,
    lesson_level text,
    lesson_day text,
    lesson_time text,
    PRIMARY KEY ("lesson_id")
);

INSERT INTO chinese_lessons(
    lesson_id, lesson_level, lesson_day, lesson_time) 
    VALUES ('CL1', 'Primary 1', 'Saturday', '9am-10am'), 
    ('CL2', 'Primary 2', 'Saturday', '11am-12pm'), 
    ('CL3', 'Primary 3', 'Saturday', '1pm-2pm'), 
    ('CL4', 'Primary 4', 'Saturday', '3pm-4pm'), 
    ('CL5', 'Primary 5', 'Saturday', '4pm-5pm'), 
    ('CL6', 'Primary 6', 'Saturday', '6pm-7pm');


CREATE TABLE math_lessons(
    lesson_id text UNIQUE,
    lesson_level text,
    lesson_day text,
    lesson_time text,
    PRIMARY KEY ("lesson_id")
);

INSERT INTO math_lessons(
    lesson_id, lesson_level, lesson_day, lesson_time) 
    VALUES ('MA1', 'Primary 1', 'Saturday', '9am-10am'), 
    ('MA2', 'Primary 2', 'Saturday', '11am-12pm'), 
    ('MA3', 'Primary 3', 'Saturday', '1pm-2pm'), 
    ('MA4', 'Primary 4', 'Saturday', '3pm-4pm'), 
    ('MA5', 'Primary 5', 'Saturday', '4pm-5pm'), 
    ('MA6', 'Primary 6', 'Saturday', '6pm-7pm');


CREATE TABLE science_lessons(
    lesson_id text UNIQUE,
    lesson_level text,
    lesson_day text,
    lesson_time text,
    PRIMARY KEY ("lesson_id")
);

INSERT INTO science_lessons(
    lesson_id, lesson_level, lesson_day, lesson_time) 
    VALUES ('SC1', 'Primary 1', 'Saturday', '9am-10am'), 
    ('SC2', 'Primary 2', 'Saturday', '11am-12pm'), 
    ('SC3', 'Primary 3', 'Saturday', '1pm-2pm'), 
    ('SC4', 'Primary 4', 'Saturday', '3pm-4pm'), 
    ('SC5', 'Primary 5', 'Saturday', '4pm-5pm'), 
    ('SC6', 'Primary 6', 'Saturday', '6pm-7pm');

	