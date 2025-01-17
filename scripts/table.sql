CREATE TABLE SEC_USER (
USER_ID VARCHAR(50) NOT NULL,
USER_EMP_ID VARCHAR(50) NOT NULL,
USER_FIRST_NM VARCHAR(50) NOT NULL,
USER_LAST_NM VARCHAR(50) NOT NULL,
USER_EMAIL VARCHAR(100) NOT NULL,
USER_PHONE VARCHAR(50) NOT NULL,
ORG_CD VARCHAR(50) NOT NULL,
USER_ROLE VARCHAR(50) NOT NULL,
USER_CNTRY_CD VARCHAR(50) NOT NULL,
USER_LOC_CD VARCHAR(50) NOT NULL,
USER_LOCALE VARCHAR(50) NOT NULL,
USER_TZ VARCHAR(50) NOT NULL,
USER_CIDRS VARCHAR(2000),
USER_START_DT DATE NOT NULL,
USER_END_DT DATE NOT NULL,
USER_PW VARCHAR(100) NOT NULL,
USER_STATUS VARCHAR(50) NOT NULL,
CRT_BY_USER VARCHAR(50) NOT NULL,
UPD_BY_USER VARCHAR(50) NOT NULL,
CRT_BY_TS DATETIME NOT NULL,
UPD_BY_TS DATETIME NOT NULL,
PRIMARY KEY (USER_ID),
CONSTRAINT SEC_USER_IX1 UNIQUE (USER_EMP_ID, ORG_CD),
CONSTRAINT SEC_USER_IX2 UNIQUE (USER_EMAIL, ORG_CD)
);

INSERT INTO SEC_USER (`USER_ID`, `USER_FIRST_NM`, `USER_LAST_NM`, `USER_EMP_ID`, `USER_EMAIL`, `USER_PHONE`, `ORG_CD`, `USER_CNTRY_CD`, `USER_LOC_CD`, `USER_LOCALE`, `USER_TZ`, `USER_CIDRS`, `USER_STATUS`, `USER_ROLE`, `USER_START_DT`, `USER_END_DT`, `USER_PW`, `CRT_BY_USER`, `UPD_BY_USER`, `CRT_BY_TS`, `UPD_BY_TS`)
VALUES ('245454889a5sef1', 'Aditya', 'Lonkar', 'alonkar', 'alonkar@gmail.com', '+91 39996-56564', 'Quadyster', 'India', 'Work From Home, India', 'India English', 'IST', '0.0.0.0/0', 'Active', 'Admin', '2023-01-01', '2024-01-01', 'dolob6109', 'alonkar', 'alonkar', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO SEC_USER (`USER_ID`, `USER_FIRST_NM`, `USER_LAST_NM`, `USER_EMP_ID`, `USER_EMAIL`, `USER_PHONE`, `ORG_CD`, `USER_CNTRY_CD`, `USER_LOC_CD`, `USER_LOCALE`, `USER_TZ`, `USER_CIDRS`, `USER_STATUS`, `USER_ROLE`, `USER_START_DT`, `USER_END_DT`, `USER_PW`, `CRT_BY_USER`, `UPD_BY_USER`, `CRT_BY_TS`, `UPD_BY_TS`)
VALUES ('24qq54889a5ses2', 'Jos', 'Buttler', 'jbuttler', 'jbuttler@gmail.com', '+91 37796-56564', 'Quadyster', 'India', 'Work From Home, India', 'India English', 'IST', '0.0.0.0/0', 'Active', 'User', '2022-07-01', '2024-07-01', 'dolob6109', 'alonkar', 'alonkar', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

        