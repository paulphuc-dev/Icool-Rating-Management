Icool Rating API Document

1. Endpoints
    (Auth)
        /api/v1/auth/login (POST)
    (Feedbacks)
        /api/v1/client/feedbacks (POST)
        /api/v1/cms/feedbacks (GET)
        /api/v1/cms/feedbacks/export (GET)
        /api/v1/cms/feedbacks/statistic (GET)
    (Stores)
        /api/v1/client/stores (GET)
    (Surveys)
        /api/v1/client/surveys (GET)
    (Regions)
        /api/v1/cms/regions/qrcode (GET)

2. WorkFlow
(Auth)
    Client --> Auth Controller: /api/v1/auth/login
    Auth Controller --> Auth Service : Validate JWT
    Auth Service --> API Controller : Valid (Token, User Information)/ Invalid

(Feedbacks)
    (Get Feedbacks)
    Client --> Feedbacks Controller : GET /api/v1/cms/feedbacks?page=1&limit=10&score=5
    Feedbacks Controller --> Client : Request Validate JWT
    Client : Validate & Paginate Request --> Feedbacks Controller : GET /api/v1/cms/feedbacks?page=1&limit=10&score=5
    Feedbacks Controller --> Feedbacks Service --> Feedbacks Repository --> Database
    Database --> Feedbacks Repository --> Feedbacks Service --> Feedbacks Controller : Paginated response
    Feedbacks Controller --> Client : 200 OK + JSON

    (Post Feedback)
    Client --> Feedbacks Controller : POST /api/v1/client/feedbacks (Request)
    Feedbacks Controller --> Feedbacks Service --> Feedbacks Repository --> Database
    Database --> Feedbacks Repository --> Feedbacks Service --> Feedbacks Controller : Added Data
    Feedbacks Controller --> Client : 200 OK + JSON

    (Get Statistic)
    Client --> Feedbacks Controller : GET /api/v1/cms/feedbacks/statistic
    Feedbacks Controller --> Client : Request Validate JWT
    Client : Validate & Statistic Request --> Feedbacks Controller : GET /api/v1/cms/feedbacks/statistic
    Feedbacks Controller --> Feedbacks Service --> Feedbacks Repository --> Database
    Database --> Feedbacks Repository --> Feedbacks Service --> Feedbacks Controller : Statistic response
    Feedbacks Controller --> Client : 200 OK + JSON

    (Export Excel)
    Client --> Feedbacks Controller : GET /api/v1/cms/feedbacks/export
    Feedbacks Controller --> Client : Request Validate JWT
    Client : Validate --> Feedbacks Controller : GET /api/v1/cms/feedbacks/export
    Feedbacks Controller --> Feedbacks Service --> Feedbacks Repository --> Database
    Database --> Feedbacks Repository --> Feedbacks Service --> Write to Excel 
    Feedbacks Controller --> Client : 200 OK + JSON

(Stores)
    Client --> Stores Controller : GET /api/v1/client/stores
    Stores Controller --> Stores Service --> Store Repository --> Database
    Database --> Store Repository --> Stores Service
    Stores Controller --> Client : 200 OK + JSON 

(Regions)
    Client --> Regions Controller : GET  /api/v1/cms/regions/qrcode
    Regions Controller --> Regions Service --> Regions Repository --> Database
    Database --> Regions Repository --> Regions Service
    Regions Controller --> Client : 200 OK + JSON 


(Surveys)
    Client --> Surveys Controller : GET  /api/v1/client/surveys
    Surveys Controller --> Surveys Service --> Surveys Repository --> Database
    Database --> Surveys Repository --> Surveys Service
    Surveys Controller --> Client : 200 OK + JSON


