from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from datetime import datetime

import gpxpy
import gpxpy.gpx


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5432/SIG'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)


class GpxData(db.Model):
    __tablename__ = "gpxdata"
    id = db.Column(db.Integer, primary_key=True)
    idtrajet = db.Column(db.Integer)
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    elevation = db.Column(db.Float)
    time = db.Column(db.String(255))

    def __init__(self, idtrajet, lat, long, elevation, time):
        self.idtrajet = idtrajet
        self.lat = lat
        self.long = long
        self.elevation = elevation
        self.time = time


@app.route('/gpxdata', methods=['POST', 'GET'])
def gpxData():
    

    # POST a data to database
    if request.method == 'POST':
        body = request.json
        idtrajet = body['idtrajet']
        lat = body['lat']
        long = body['long']
        elevation = body['elevation']

        # save real time tracking
        now = datetime.now()
        current_time = now.strftime("%Y-%m-%dT%H:%M:%SZ")

        data = GpxData(idtrajet, lat, long, elevation, current_time)
        db.session.add(data)
        db.session.commit()

        return jsonify({
            'status': 'Data is posted to PostgreSQL!',
            'idtrajet': idtrajet,
            'lat': lat,
            'long': long,
            'elevation': elevation,
            'time': current_time
        })

    # GET all data from database & sort by id
    if request.method == 'GET':
        data = GpxData.query.order_by(GpxData.id).all()
        dataJson = []
        dataDict = {}
        for line in data:  # loop through the user data
            dataDict = {
                'id': line.id,
                'idtrajet': line.idtrajet,
                'lat': line.lat,
                'long': line.long,
                'elevation': line.elevation,
                'time': line.time
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)


# API for creating gpx file (POST : gpxfile/id ==> id.gpx)
@app.route('/gpxfile/<idtrajet>', methods=['POST'])
def createGPX(idtrajet=None):

    # POST a data to database
    if request.method == 'POST':
        

        # Creating a new file:
        # --------------------

        gpx = gpxpy.gpx.GPX()

        # Create first track in our GPX:
        gpx_track = gpxpy.gpx.GPXTrack()
        gpx.tracks.append(gpx_track)

        # Create first segment in our GPX track:
        gpx_segment = gpxpy.gpx.GPXTrackSegment()
        gpx_track.segments.append(gpx_segment)

        # Create route points:
        trajetPoints = GpxData.query.filter_by(idtrajet=str(idtrajet))
        for point in trajetPoints:
            gpx_segment.points.append(
            gpxpy.gpx.GPXTrackPoint(point.lat, point.long, point.elevation))

        # You can add routes and waypoints, too...

        print('Created GPX:', gpx.to_xml())

        # Write gpx file
        filename = "./assets/gpx/" + str(idtrajet) + ".gpx"
        outF = open(filename, "w")
        outF.write(gpx.to_xml())
        outF.close()

        return jsonify({
            'status': 'GPX file created successfully!'
        })



if __name__ == '__main__':
    app.debug = True
    app.run()
