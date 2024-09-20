# NodeMCU LED Control Project

Bu proje, NodeMCU ve Firebase kullanarak 4 adet LED'i bir web arayüzü üzerinden kontrol etmenizi sağlar. Proje, React ile geliştirilen bir arayüz ve Firebase Realtime Database kullanarak LED'lerin durumlarını güncellemektedir.

## Özellikler

- 4 adet LED'i web arayüzü üzerinden kontrol edebilme.
- Gerçek zamanlı güncelleme ve izleme.
- Kolay kurulum ve Vercel üzerinden deploy edebilme.

## Gereksinimler

- NodeMCU (ESP8266 veya ESP32)
- LED'ler ve uygun dirençler
- Breadboard ve jumper kabloları
- GitHub ve Vercel hesapları
- Firebase hesabı

## Kurulum ve Kullanım

### 1. NodeMCU Devresinin Kurulumu

- NodeMCU’yu breadboard’a yerleştirin.
- LED’lerin anot uçlarını direnç ile NodeMCU’nun GPIO pinlerine, katot uçlarını ise GND’ye bağlayın:
  - LED 1: GPIO D1
  - LED 2: GPIO D2
  - LED 3: GPIO D3
  - LED 4: GPIO D4

### 2. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin ve yeni bir proje oluşturun.
2. Gerçek Zamanlı Veritabanı (Realtime Database) hizmetini etkinleştirin.
3. Veritabanınıza, LED durumlarını takip edebilmek için başlangıç verilerini ekleyin.

### 3. React Projesini Kurma

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/proje-adi.git
   cd proje-adi
