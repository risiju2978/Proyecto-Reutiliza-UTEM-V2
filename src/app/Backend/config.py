import os

DATABASE_URI = "mysql://uwdgmazm3e8bvlvf:qODcFsxhVOXt4bcfF68a@bri5c4neylxm1aftkxq9-mysql.services.clever-cloud.com:3306/bri5c4neylxm1aftkxq9"

SQLALCHEMY_DATABASE_URI = DATABASE_URI
SQLALCHEMY_TRACK_MODIFICATIONS = False

SQLALCHEMY_POOL_SIZE = 5  # Número de conexiones a mantener en el pool. Cambia según tus necesidades.
SQLALCHEMY_POOL_TIMEOUT = 10  # Especifica el tiempo (en segundos) para esperar cuando se solicita una conexión.
SQLALCHEMY_POOL_RECYCLE = 280  # Tiempo (en segundos) para reciclar una conexión.
SQLALCHEMY_MAX_OVERFLOW = 2  # Número de conexiones que se pueden crear después de alcanzar el tamaño del pool.
