from flask_restful import Resource, reqparse
from models.hotel import HotelModel

hoteis = [
    {
     'hotel_id': 'Cachorro',
     'nome': 'Cachorro Brega Bar hotel',
     'estrelas': 4.7,
     'diaria': 300.00,
     'cidade': 'São Paulo'
    },
    {
     'hotel_id': 'Cavalo',
     'nome': 'Jogo do bicho hotel',
     'estrelas': 3.1,
     'diaria': 34.00,
     'cidade': 'Minas Gerais'
    },
    {
     'hotel_id': 'Cobra',
     'nome': 'Bar da Cobra Colombiana',
     'estrelas': 2.3,
     'diaria': 10.00,
     'cidade': 'Itapetininga'
    }
]





class Hoteis(Resource):
    def get(self):
        return {'hoteis': hoteis}

class Hotel(Resource):

    #argumentos que o reqparse coleta sempre que for compatível com o nome enviado.

    argumentos = reqparse.RequestParser()
    argumentos.add_argument('nome')
    argumentos.add_argument('estrelas')
    argumentos.add_argument('diaria')
    argumentos.add_argument('cidade')

    # achar o hotel procura na lista já criada, se o hotel existir, retorna o objeto, caso não exista, retorna none
    def find_hotel(self,hotel_id):
        for hotel in hoteis:
            if hotel['hotel_id'] == hotel_id:
                return hotel
        return None

    def get(self,hotel_id):
        hotel = Hotel.find_hotel(self, hotel_id)
        if hotel:
            return hotel


    def post(self,hotel_id):


        dados = Hotel.argumentos.parse_args()
        hotel_objeto = HotelModel(hotel_id,**dados)
        novo_hotel = hotel_objeto.json()
        '''
        antes da sintaxe descrita acima
        novo_hotel = {
            'hotel_id': hotel_id,**dados
        }'''
        procure = Hotel.find_hotel(self,hotel_id)
        if not procure:
            hoteis.append(novo_hotel)
            return novo_hotel, 200
        return {"message": "Hotel already exist."}

    def put(self,hotel_id):
        dados = Hotel.argumentos.parse_args()
        novo_hotel = {"hotel_id": hotel_id, **dados}

        hotel = Hotel.find_hotel(self,hotel_id)

        if hotel:
            hotel.update(novo_hotel)
            return novo_hotel,200
        hoteis.append(novo_hotel)
        return novo_hotel, 201

    def delete(self,hotel_id):
        global hoteis
        hoteis = [hotel for hotel in hoteis if hotel['hotel_id'] != hotel_id]
        return {"message": "Hotel Deleted or Don't Exist."}

