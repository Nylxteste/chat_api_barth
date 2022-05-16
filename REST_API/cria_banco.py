""" import sqlite3

connection = sqlite3.connect('banco_db')

cursor = connection.cursor()

criar_tabela = "CREATE TABLE IF NOT EXISTS hoteis (hotel_id text PRIMARY KEY,\
nome text, estrelas real, diaria real, cidade text)"

cursor.execute(criar_tabela)

connection.commit()
connection.close() """



import sqlite3

connection = sqlite3.connect('banco.db')

cursor = connection.cursor()



cria_tabela = "CREATE TABLE IF NOT EXISTS hoteis(id_hotel TEXT PRIMARY KEY,\
hotel TEXT, estrelas REAL, cidade TEXT)"

cursor.execute(cria_tabela)


connection.commit()
connection.close()