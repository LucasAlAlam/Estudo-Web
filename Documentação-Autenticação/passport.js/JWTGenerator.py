import json
import base64
import hashlib
import rsa

def load_private_key_from_pem():
    with open("../id_rsa_priv.pem", "rb") as key_file:
        return rsa.PrivateKey.load_pkcs1(key_file.read())   #carrega a chave privada a partir do arquivo pem

def base64url_encode(data):
    return base64.urlsafe_b64encode(data).decode('utf-8').rstrip('=') #codifica o dado em base64url

def sign (message:bytes, privateKey):

    #criamos uma concatenação entre o hash da mensagem e essa coisa aí, que é um valor padrão indicando o método de hash que foi usado para criar o hash da mensagem. Cada método de hash tem o seu. Nesse caso, é o código para sha-256
    cleartext = b"\x30\x31\x30\x0d\x06\x09\x60\x86\x48\x01\x65\x03\x04\x02\x01\x05\x00\x04\x20" + message

    #calcula o tamanho em blocos de bytes do módulo da chave privada. Isso poderia ser feito simplesmente fazendo uma divisão modular por 8 e, se o resto fosse maior que 0, adicionava 1 ao quociente e o tamanho dos blocos seria o quociente 
    keylength = rsa.common.byte_size(private_key.n)

    #Isso adiciona bytes aleatórios na mensagem dentro de um padding (algo como um "enchimento"). Esse preenchimento segue especificações do PKCS#1, que estabelece alguns padrões criptográficos. Ao final, temos a mensagem montada no clear text junto com o padding
    padded = rsa.pkcs1._pad_for_signing(cleartext, keylength)

    #apenas passa o padded para int a fim de realizar os cálculos
    payload = int.from_bytes(padded, 'big', signed=False)

    #criptografa o payload. Aqui não é usada a criptografia padrão, mas sim a criptografia associada com uma técnica denominada blinding. Essa técnica serve para esconder de modo mais persistente a chave privada usada na assinatura da chave. Mais detalhes podem ser vistos em https://en.wikipedia.org/wiki/Blinding_(cryptography)
    encrypted = private_key.blinded_encrypt(payload)
    signature_bytes = rsa.transform.int2bytes(encrypted, keylength)
    return signature_bytes

def create_jwt(header, payload, private_key):

    # Transformar o header e o payload em tokens, passando-os para base64 e, depois, unindo-os para compor a primeira parte do token
    header_encoded = base64url_encode(json.dumps(header, separators=(',', ':')).encode('utf-8'))
    payload_encoded = base64url_encode(json.dumps(payload, separators=(',', ':')).encode('utf-8'))
    message = f"{header_encoded}.{payload_encoded}".encode('utf-8')

    #Hash do header e payload codificados
    messageHash = hashlib.sha256(message).digest()

    #Depois, fazemos a assinatura do hash com header e payload. Isso é, criptografamos o hash usando a chave privada da aplicação
    #OBS: note que, com a chave privada, fica muito simples gerar tokens válidos para a API. Então, cuide muito bem dela! 
    signed = sign(messageHash, private_key)
    signature_encoded = base64url_encode(signed)
    return f"{header_encoded}.{payload_encoded}.{signature_encoded}"

# Carrega a chave privada RSA
private_key = load_private_key_from_pem()

# configura o Cabeçalho e payload do JWT
header = {"alg":"RS256","typ":"JWT"}
payload = {"sub":8,"iat":1715713070,"exp":5000000000}

# Gera o JWT
token = create_jwt(header, payload, private_key)
print(token)


