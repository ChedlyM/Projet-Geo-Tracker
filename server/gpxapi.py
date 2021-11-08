from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_cors import CORS, cross_origin

from datetime import datetime, time

import gpxpy
import gpxpy.gpx


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345678@localhost:5432/SIG'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)
#cors = CORS(app, resources={r"/gpxData": {"origins": "*"}})
#app.config['CORS_HEADERS'] = 'Content-Type'

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    password = db.Column(db.String(255))
    role = db.Column(db.String(255))

    def __init__(self, name, password, role):
        self.name = name
        self.password = password
        self.role = role

    def __repr__(self):
        return '%s/%s/%s/%s' % (self.id, self.name, self.password, self.role)


@app.route('/user/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        body = request.json
        name = body['username']
        password = body['password']
        data = User.query.order_by(User.id).all()
        for i in range(len(data)):
            if((name == str(data[i]).split('/')[1]) and (password == str(data[i]).split('/')[2])):
                return jsonify({
                    'id': str(data[i]).split('/')[0],
                    'name': name,
                    'password': password,
                    'role': str(data[i]).split('/')[3]
                })


@app.route('/user', methods=['POST', 'GET'])
def data():

    # POST a data to database
    if request.method == 'POST':
        body = request.json
        name = body['name']
        password = body['password']
        role = body['role']

        data = User(name, password, role)
        db.session.add(data)
        db.session.commit()

        return jsonify({
            'name': name,
            'password': password,
            'role': role
        })

    # GET all data from database & sort by id
    if request.method == 'GET':
        # data = User.query.all()
        data = User.query.order_by(User.id).all()
        print(data)
        dataJson = []
        for i in range(len(data)):
            if (str(data[i]).split('/')[3] == "Client"):
                dataDict = {
                    'id': str(data[i]).split('/')[0],
                    'name': str(data[i]).split('/')[1],
                    'password': str(data[i]).split('/')[2],
                    'role': str(data[i]).split('/')[3]
                }
                dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/user/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def onedata(id):

    # GET a specific data by id
    if request.method == 'GET':
        data = User.query.get(id)
        print(data)
        dataDict = {
            'id': str(data).split('/')[0],
            'name': str(data).split('/')[1],
            'password': str(data).split('/')[2],
            'role': str(data).split('/')[3],
        }
        return jsonify(dataDict)

    # DELETE a data
    if request.method == 'DELETE':
        delData = User.query.filter_by(id=id).first()
        db.session.delete(delData)
        db.session.commit()
        return jsonify({'status': 'Data '+id+' is deleted from PostgreSQL!'})

    # UPDATE a data by id
    if request.method == 'PUT':
        body = request.json
        newName = body['name']
        newPassword = body['password']
        newRole = body['role']
        editData = User.query.filter_by(id=id).first()
        editData.name = newName
        editData.password = newPassword
        editData.role = newRole
        db.session.commit()
        return jsonify({'status': 'Data '+id+' is updated from PostgreSQL!'})


class Activity(db.Model):
    __tablename__ = "activity"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    distance = db.Column(db.Integer)
    date = db.Column(db.Date)
    comments = db.Column(db.String(255))
    gpxData = db.Column(db.String(255))

    def __init__(self, name, distance, date, comments, gpxData):
        self.name = name
        self.distance = distance
        self.date = date
        self.comments = comments
        self.gpxData = gpxData

    def __repr__(self):
        return '%s/%s/%s/%s/%s/%s' % (self.id, self.name, self.distance, self.date, self.comments, self.gpxData)


@app.route('/activity', methods=['POST', 'GET'])
def dataActivity():

    # POST a data to database
    if request.method == 'POST':
        body = request.json
        name = body['name']
        distance = body['distance']
        date = body['date']
        comments = body['comments']
        gpxData = body['gpxData']

        data = Activity(name, distance, date, comments, gpxData)
        db.session.add(data)
        db.session.commit()

        return jsonify({
            'status': 'Data is posted to PostgreSQL!',
            'name': name,
            'distance': distance,
            'date': date,
            'comments': comments,
            'gpxData': gpxData
        })

    # GET all data from database & sort by id
    if request.method == 'GET':
        # data = Activity.query.all()
        data = Activity.query.order_by(Activity.id).all()
        print(data)
        dataJson = []
        for i in range(len(data)):
            # print(str(data[i]).split('/'))
            dataDict = {
                'id': str(data[i]).split('/')[0],
                'name': str(data[i]).split('/')[1],
                'distance': str(data[i]).split('/')[2],
                'date': str(data[i]).split('/')[3],
                'comments': str(data[i]).split('/')[4],
                'gpxData': str(data[i]).split('/')[5]
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/activity/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def onedataActivity(id):

    # GET a specific data by id
    if request.method == 'GET':
        data = Activity.query.get(id)
        print(data)
        dataDict = {
            'id': str(data).split('/')[0],
            'name': str(data).split('/')[1],
            'distance': str(data).split('/')[2],
            'date': str(data).split('/')[3],
            'comments': str(data).split('/')[4],
            'gpxData': str(data).split('/')[5]
        }
        return jsonify(dataDict)

    # DELETE a data
    if request.method == 'DELETE':
        delData = Activity.query.filter_by(id=id).first()
        db.session.delete(delData)
        db.session.commit()
        return jsonify({'status': 'Data '+id+' is deleted from PostgreSQL!'})

    # UPDATE a data by id
    if request.method == 'PUT':
        body = request.json
        newName = body['name']
        newDistance = body['distance']
        newDate = body['date']
        newComments = body['comments']
        newGpxData = body['gpxData']
        editData = Activity.query.filter_by(id=id).first()
        editData.name = newName
        editData.distance = newDistance
        editData.date = newDate
        editData.comments = newComments
        editData.gpxData = newGpxData
        db.session.commit()
        return jsonify({'status': 'Data '+id+' is updated from PostgreSQL!'})

###############################


class GpxData(db.Model):
    __tablename__ = "gpxdata"
    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    time = db.Column(db.String(255))
    idUser = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, lat, long, time, idUser):
        self.lat = lat
        self.long = long
        self.time = time
        self.idUser = idUser


@app.route('/gpxdata', methods=['POST', 'GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def gpxData():

    # save position in the BD
    if request.method == 'POST':
        body = request.json
        lat = body['lat']
        long = body['long']
        idUser = body['idUser']

        # save real time tracking
        now = datetime.now()
        current_time = now.strftime("%Y-%m-%d")  
        data = GpxData(lat, long, current_time, idUser)
        db.session.add(data)
        db.session.commit()

        return jsonify({
            'status': 'Data is posted to PostgreSQL!',
            'lat': lat,
            'long': long,
            'time': current_time,
            'idUser': idUser
        })

    # GET all data from database & sort by id
    if request.method == 'GET':
        data = GpxData.query.order_by(GpxData.id).all()
        dataJson = []
        dataDict = {}
        for line in data:  # loop through the user data
            dataDict = {
                'id': line.id,
                'lat': line.lat,
                'long': line.long,
                'time': line.time,
                'idUser': line.idUser
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)

# GET last user position


@app.route('/lastuserpos/<idUser>', methods=['GET'])
def getLastUserPos(idUser=None):
    # GET all data from database & sort by id
    if request.method == 'GET':
        data = GpxData.query.filter_by(idUser=str(idUser))
        data = data[::-1]
        dataJson = []
        dataDict = {}
        dataDict = {
            'lat': data[0].lat,
            'long': data[0].long
        }
        dataJson.append(dataDict)
        return jsonify(dataJson)



# API for creating gpx file (POST : gpxfile/date/idUser ==> date_idUser.gpx)
@app.route('/gpxfile/<date>/<idUser>', methods=['POST'])
def createGPX(date=None, idUser=None):

    # generer gpx file
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
        trajetPoints = GpxData.query.filter_by(
            time=str(date), idUser=idUser)  # id user/ date
        for point in trajetPoints:
            gpx_segment.points.append(
                gpxpy.gpx.GPXTrackPoint(point.lat, point.long))

        # You can add routes and waypoints, too...

        print('Created GPX:', gpx.to_xml())

        # Write gpx file
        filename = "../front/src/assets/" + str(date) + "_" + str(idUser) + ".gpx"
        outF = open(filename, "w")
        outF.write(gpx.to_xml())
        outF.close()

        return jsonify({
            'status': 'GPX file created successfully!'
        })

# API for getting all routes by user (POST : gpxdata/idUser ==> {idTrajet, time})


@app.route('/gpxuserdata/<idUser>', methods=['GET'])
def gpxUserData(idUser=None):

    # GET  dates by userId
    if request.method == 'GET':
        data = GpxData.query.filter_by(idUser=str(idUser))
        dataJson = []
        dataDict = {}
        d = list()
        for line in data:
            if line.time not in d:
                d.append(line.time)
        for x in d:  # loop through the user data
            dataDict = {
                'time': x
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/gpxPoints/<date>/<idUser>', methods=['GET'])
def getPoints(date=None,idUser=None):
    dataJson = []
    dataDict = {}
    # GET all data from database & sort by id
    if request.method == 'GET':
        trajetPoints = GpxData.query.filter_by(time=str(date), idUser=idUser)
       
        for point in trajetPoints:
            dataDict = {
            'lat': point.lat,
            'long': point.long
            }
            dataJson.append(dataDict)
    return jsonify(dataJson)


if __name__ == '__main__':
    app.debug = True
    app.run()
