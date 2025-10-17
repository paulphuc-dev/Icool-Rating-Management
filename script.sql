CREATE TABLE feedback_tbl (
	id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
	option_id bigint NOT NULL,
	region_id bigint NOT NULL,
	region_name nvarchar(255) NOT NULL,
	store_code varchar(20) NOT NULL,
	phone_number varchar(20),
	rating_date date,
	content nvarchar(MAX),
	active bit DEFAULT 1,
	created_at datetime NOT NULL DEFAULT getdate(),
	created_by varchar(50),
	updated_at datetime,
	updated_by varchar(50),
	deleted_at datetime,
	deleted_by varchar(50),
	delete_flag bit DEFAULT 0
);

CREATE TABLE feedback_detail_tbl (
	id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
	feedback_id UNIQUEIDENTIFIER NOT NULL,
	detail_id bigint NOT NULL,
	active bit DEFAULT 1,
	created_at datetime NOT NULL DEFAULT getdate(),
	created_by varchar(50),
	updated_at datetime,
	updated_by varchar(50),
	deleted_at datetime,
	deleted_by varchar(50),
	delete_flag bit DEFAULT 0
);