#Dependencies
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS

#Database setup
connection_string = "postgres:postgres@localhost:5432/Project_2"
engine = create_engine(f'postgresql://{connection_string}')
Base= automap_base()
Base.prepare(engine, reflect=True)

# Save references to each table
home_values = Base.classes.homevalues
schools = Base.classes.schools
merged= Base.classes.schools_homevalues

#Flask setup
app = Flask(__name__)
CORS(app)
# 

# Flask routes

@app.route("/")
def welcome():
    #create session and bind to engine
    session = Session(engine)
    db= session.query(merged)

    schools_list=[]
    # Perform a query to retrieve the data and precipitation scores
    for x in db:
        schools_dict = {
            "id": x.id,
            "RCDTS": x.RCDTS,
            "School_Name": x.School_Name,
            "School_Type":x.School_Type,
            "County": x.County,
            "N_Student_Enrollment": x.N_Student_Enrollment,
            "Perc_Student_Enrollment_Low_Income": x.Perc_Student_Enrollment_Low_Income,
            "Student_Attendance_Rate": x.Student_Attendance_Rate,
            "Site_level_Per_Pupil_Expenditures_Subtotal": x.Site_level_Per_Pupil_Expenditures_Subtotal,
            "District_Centralized_Per_Pupil_Expenditure_Subtotal": x.District_Centralized_Per_Pupil_Expenditure_Subtotal,
            "Total_Per_Pupil_Expenditures_Subtotal": x.Total_Per_Pupil_Expenditures_Subtotal,
            "SAT_Reading_Average": x.SAT_Reading_Average,
            "SAT_Math_Average": x.SAT_Math_Average,
            "Address": x.Address,
            "City": x.City,
            "County_Name": x.County_Name,
            "Rec_Type": x.Rec_Type,
            "Zip": x.Zip,
            "coordinates": [x.Lng, x.Lat],
            "Avg_Home_Value": x.Avg_Home_Value
        }
        session.close()
        schools_list.append(schools_dict)

    #np.ravel to create a dictionary of the results, then list() to enable jsonification
    schools_list= list(np.ravel(schools_list))

    return jsonify(schools_list)

if __name__ == '__main__':
    app.run(debug=True)
