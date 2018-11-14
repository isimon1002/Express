FROM mongo:latest

RUN mkdir -p /data/db2 \
	&& echo "dbpath = /data/db2" > /etc/mongodb.conf \
	&& chown -R mongodb:mongodb /data/db2

# COPY /json /data/db2/json
# RUN ls /data/db2/json

RUN mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db2 --smallfiles \
	# && mongoimport --jsonArray --db healthdb --collection users --drop --file /data/db2/json/users.json \
	# && mongoimport --jsonArray --db healthdb --collection patients --drop --file /data/db2/json/patients.json \
	# && mongoimport --jsonArray --db healthdb --collection encounters --drop --file /data/db2/json/encounters.json \
    && mongod --dbpath /data/db2 --shutdown \
    && chown -R mongodb /data/db2

# Make the new dir a VOLUME
VOLUME /data/db2

# Expose the default MongoDB Port
EXPOSE 27017

CMD ["mongod", "--config", "/etc/mongodb.conf", "--smallfiles"]
