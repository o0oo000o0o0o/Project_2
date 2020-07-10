#Dependencies
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

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
# 

# Flask routes

@app.route("/")
def welcome():
    return "Hello World!"





if __name__ == '__main__':
    app.run(debug=True)
