-- DROP TABLE schools;
CREATE TABLE "schools" (
	"id" SERIAL PRIMARY KEY,
    "RCDTS" BIGINT NOT NULL,
    "School Name"  VARCHAR(200),
    "School Type" VARCHAR(200),
    "County" VARCHAR(100),
    "# Student Enrollment" FLOAT,
    "Perc Student Enrollment - Low Income" FLOAT,
    "Student Attendance Rate" FLOAT,
    "$ Site-level PEr-Pupil Expenditures - Subtotal" FLOAT,
    "$ District Centralized Per-Pupil Expenditure - Subtotal" FLOAT,
    "$ Total Per-Pupil Expenditures - Subtotal" FLOAT,
    "SAT Reading Average" FLOAT,
    "SAT Math Average" FLOAT,
    "Address" VARCHAR(300),
    "City" VARCHAR(100),
    "CountyName" VARCHAR(100),
    "RecType" VARCHAR(100),
    "Zip" INT,
    "Lat" FLOAT,
    "Lng" FLOAT
);
SELECT * from schools;

-- DROP TABLE homevalues;
CREATE TABLE "homevalues" (
	"id" SERIAL PRIMARY KEY,
    "RegionID" INT NOT NULL,
    "SizeRank" INT NOT NULL,
    "Zip" INT NOT NULL,
    "State" VARCHAR(100),
    "City" VARCHAR(100),
    "Metro" VARCHAR(100),
    "CountyName" VARCHAR(100),
    "2019-01-31" INT NOT NULL, 
    "2019-02-28" INT NOT NULL, 
    "2019-03-31" INT NOT NULL, 
    "2019-04-30" INT NOT NULL, 
    "2019-05-31" INT NOT NULL, 
    "2019-06-30" INT NOT NULL, 
    "2019-07-31" INT NOT NULL, 
    "2019-08-31" INT NOT NULL, 
    "2019-09-30" INT NOT NULL, 
    "2019-10-31" INT NOT NULL, 
    "2019-11-30" INT NOT NULL, 
    "2019-12-31" INT NOT NULL, 
    "AvgHomeValue" INT NOT NULL
);
SELECT * from homevalues;

-- DROP TABLE schools_homevalues;
CREATE TABLE "schools_homevalues" (
	"id" SERIAL PRIMARY KEY,
    "RCDTS" BIGINT NOT NULL,
    "School_Name"  VARCHAR(200),
    "School_Type" VARCHAR(200),
    "County" VARCHAR(100),
    "N_Student_Enrollment" FLOAT,
    "Perc_Student_Enrollment_Low_Income" FLOAT,
    "Student_Attendance_Rate" FLOAT,
    "Site_level_Per_Pupil_Expenditures_Subtotal" FLOAT,
    "District_Centralized_Per_Pupil_Expenditure_Subtotal" FLOAT,
    "Total_Per_Pupil_Expenditures_Subtotal" FLOAT,
    "SAT_Reading_Average" FLOAT,
    "SAT_Math_Average" FLOAT,
    "Address" VARCHAR(300),
    "City" VARCHAR(100),
    "County_Name" VARCHAR(100),
    "Rec_Type" VARCHAR(100),
    "Zip" INT,
    "Lat" FLOAT,
    "Lng" FLOAT,
    "Avg_Home_Value" INT NOT NULL
);
SELECT * from schools_homevalues;



