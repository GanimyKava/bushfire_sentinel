# Architecture Overview

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        User[Users]
        Browser[Web Browser]
    end

    subgraph "Frontend"
        FrontendApp[React Application]
    end

    subgraph "Backend"
        APIServer[Express API Server]
        SocketServer[Socket.io Server]
    end

    subgraph "Data Layer"
        Database[(MongoDB)]
    end

    subgraph "External Services"
        ExternalAPIs[External APIs]
    end

    User --> Browser
    Browser --> FrontendApp
    FrontendApp --> APIServer
    FrontendApp --> SocketServer
    APIServer --> Database
    APIServer --> ExternalAPIs
    SocketServer --> FrontendApp

    classDef frontend fill:#61dafb,stroke:#20232a,stroke-width:2px
    classDef backend fill:#339933,stroke:#20232a,stroke-width:2px
    classDef database fill:#4db33d,stroke:#20232a,stroke-width:2px
    classDef external fill:#ff6b35,stroke:#20232a,stroke-width:2px

    class FrontendApp frontend
    class APIServer,SocketServer backend
    class Database database
    class ExternalAPIs external
```

## Frontend Architecture

```mermaid
graph TB
    subgraph "Pages"
        Dashboard[Dashboard]
        Geofence[Geofence]
        Detection[Detection]
        Drones[Drones]
        Subscribers[Subscribers]
        Alerts[Alerts]
        Analytics[Analytics]
        Login[Login]
    end

    subgraph "Shared Components"
        Layout[Layout]
        Map[Map Components]
        Charts[Chart Components]
    end

    subgraph "State Management"
        AuthContext[Auth Context]
        AxiosClient[Axios Client]
    end

    Dashboard --> Layout
    Geofence --> Layout
    Detection --> Layout
    Drones --> Layout
    Subscribers --> Layout
    Alerts --> Layout
    Analytics --> Layout

    Dashboard --> Map
    Dashboard --> Charts
    Geofence --> Map
    Detection --> Map
    Alerts --> Map
    Analytics --> Charts

    Login --> AuthContext
    Dashboard --> AuthContext
    Geofence --> AuthContext
    Detection --> AuthContext
    Drones --> AuthContext
    Subscribers --> AuthContext
    Alerts --> AuthContext
    Analytics --> AuthContext

    Dashboard --> AxiosClient
    Geofence --> AxiosClient
    Detection --> AxiosClient
    Drones --> AxiosClient
    Subscribers --> AxiosClient
    Alerts --> AxiosClient
    Analytics --> AxiosClient

    classDef pages fill:#61dafb,stroke:#20232a,stroke-width:2px
    classDef components fill:#90caf9,stroke:#20232a,stroke-width:2px
    classDef state fill:#42a5f5,stroke:#20232a,stroke-width:2px

    class Dashboard,Geofence,Detection,Drones,Subscribers,Alerts,Analytics,Login pages
    class Layout,Map,Charts components
    class AuthContext,AxiosClient state
```

## Backend Architecture

```mermaid
graph TB
    subgraph "API Routes"
        AuthRoute["/api/auth"]
        DroneRoute["/api/drones"]
        GeofenceRoute["/api/geofences"]
        DetectionRoute["/api/detections"]
        AlertRoute["/api/alerts"]
        SubscriberRoute["/api/subscribers"]
        DashboardRoute["/api/dashboard"]
    end

    subgraph "Middleware"
        AuthMiddleware[JWT Auth]
        CORS[CORS]
    end

    subgraph "Data Models"
        UserModel[User]
        DroneModel[Drone]
        GeofenceModel[Geofence]
        DetectionModel[Detection]
        AlertModel[Alert]
        SubscriberModel[Subscriber]
    end

    subgraph "Utilities"
        DemoData[Demo Data]
        Seed[Database Seeder]
        MockAPIs[Mock APIs]
    end

    subgraph "Real-time"
        SocketIO[Socket.io]
    end

    AuthRoute --> AuthMiddleware
    DroneRoute --> AuthMiddleware
    GeofenceRoute --> AuthMiddleware
    DetectionRoute --> AuthMiddleware
    AlertRoute --> AuthMiddleware
    SubscriberRoute --> AuthMiddleware
    DashboardRoute --> AuthMiddleware

    AuthRoute --> UserModel
    DroneRoute --> DroneModel
    GeofenceRoute --> GeofenceModel
    DetectionRoute --> DetectionModel
    AlertRoute --> AlertModel
    SubscriberRoute --> SubscriberModel

    DroneRoute --> DemoData
    GeofenceRoute --> DemoData
    DetectionRoute --> DemoData
    AlertRoute --> DemoData
    SubscriberRoute --> DemoData

    AlertRoute --> SocketIO
    DetectionRoute --> SocketIO

    SubscriberRoute --> MockAPIs
    GeofenceRoute --> MockAPIs
    DroneRoute --> MockAPIs

    classDef routes fill:#339933,stroke:#20232a,stroke-width:2px
    classDef middleware fill:#66bb6a,stroke:#20232a,stroke-width:2px
    classDef models fill:#81c784,stroke:#20232a,stroke-width:2px
    classDef utils fill:#a5d6a7,stroke:#20232a,stroke-width:2px
    classDef realtime fill:#f39c12,stroke:#20232a,stroke-width:2px

    class AuthRoute,DroneRoute,GeofenceRoute,DetectionRoute,AlertRoute,SubscriberRoute,DashboardRoute routes
    class AuthMiddleware,CORS middleware
    class UserModel,DroneModel,GeofenceModel,DetectionModel,AlertModel,SubscriberModel models
    class DemoData,Seed,MockAPIs utils
    class SocketIO realtime
```

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Frontend"
        Pages[Pages]
        Axios[Axios Client]
    end

    subgraph "Backend"
        Routes[API Routes]
        Middleware[Middleware]
        Models[Data Models]
    end

    subgraph "Database"
        MongoDB[(MongoDB)]
    end

    subgraph "External"
        ExternalAPIs[External APIs]
    end

    Pages --> Axios
    Axios --> Routes
    Routes --> Middleware
    Middleware --> Models
    Models --> MongoDB
    Routes --> ExternalAPIs
    Routes --> SocketIO[Socket.io]
    SocketIO --> Pages

    classDef frontend fill:#61dafb,stroke:#20232a,stroke-width:2px
    classDef backend fill:#339933,stroke:#20232a,stroke-width:2px
    classDef database fill:#4db33d,stroke:#20232a,stroke-width:2px
    classDef external fill:#ff6b35,stroke:#20232a,stroke-width:2px
    classDef realtime fill:#f39c12,stroke:#20232a,stroke-width:2px

    class Pages,Axios frontend
    class Routes,Middleware,Models backend
    class MongoDB database
    class ExternalAPIs external
    class SocketIO realtime
```

## Integration Architecture

```mermaid
graph TB
    subgraph "Backend Services"
        APIServer[API Server]
        SocketServer[Socket.io]
    end

    subgraph "External APIs - Mocked"
        CAMARA[CAMARA APIs]
        Nokia[Nokia NaaC]
        Twilio[Twilio SMS]
    end

    subgraph "External Services"
        BOM[BOM API]
        RFS[RFS API]
        MaaS[MaaS APIs]
    end

    subgraph "Database"
        MongoDB[(MongoDB)]
    end

    APIServer --> CAMARA
    APIServer --> Nokia
    APIServer --> Twilio
    APIServer --> BOM
    APIServer --> RFS
    APIServer --> MaaS
    APIServer --> MongoDB
    APIServer --> SocketServer

    classDef backend fill:#339933,stroke:#20232a,stroke-width:2px
    classDef mocked fill:#ff6b35,stroke:#20232a,stroke-width:2px
    classDef external fill:#ff9800,stroke:#20232a,stroke-width:2px
    classDef database fill:#4db33d,stroke:#20232a,stroke-width:2px
    classDef realtime fill:#f39c12,stroke:#20232a,stroke-width:2px

    class APIServer backend
    class CAMARA,Nokia,Twilio mocked
    class BOM,RFS,MaaS external
    class MongoDB database
    class SocketServer realtime
```

# System Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MongoDB
    participant SocketIO
    participant ExternalAPIs

    User->>Frontend: Login Request
    Frontend->>Backend: POST /api/auth/login
    Backend->>MongoDB: Query User
    MongoDB-->>Backend: User Data
    Backend-->>Frontend: JWT Token
    Frontend->>Frontend: Store Token in Context

    User->>Frontend: View Dashboard
    Frontend->>Backend: GET /api/dashboard with JWT
    Backend->>Backend: Verify JWT
    Backend->>MongoDB: Query Metrics
    MongoDB-->>Backend: Dashboard Data
    Backend-->>Frontend: Metrics and Stats

    User->>Frontend: View Geofences
    Frontend->>Backend: GET /api/geofences
    Backend->>MongoDB: Query Geofences
    MongoDB-->>Backend: Geofence Polygons GeoJSON
    Backend->>ExternalAPIs: Mock Nokia NaaC
    ExternalAPIs-->>Backend: Network Slice Info
    Backend-->>Frontend: Geofences + Network Data

    User->>Frontend: View Drones
    Frontend->>Backend: GET /api/drones
    Backend->>MongoDB: Query Drones
    MongoDB-->>Backend: Drone Fleet Data
    Backend->>ExternalAPIs: Mock CAMARA Quality
    ExternalAPIs-->>Backend: Network Quality
    Backend-->>Frontend: Drones + Network Quality

    Backend->>Backend: New Detection Event
    Backend->>MongoDB: Save Detection
    Backend->>MongoDB: Create Alert
    Backend->>ExternalAPIs: Send SMS via Twilio
    Backend->>SocketIO: Broadcast Alert
    SocketIO-->>Frontend: Real-time Alert Update
    Frontend->>User: Show Alert Notification

    User->>Frontend: Query Analytics
    Frontend->>Backend: POST /api/analytics/query
    Backend->>ExternalAPIs: Query MaaS Knowledge Base
    ExternalAPIs-->>Backend: Analytical Data
    Backend->>ExternalAPIs: Query BOM or RFS if needed
    ExternalAPIs-->>Backend: Weather and Fire Data
    Backend-->>Frontend: AI-Generated Response
    Frontend->>User: Display Analytics with Charts
```

# Data Model Relationships

```mermaid
erDiagram
    User ||--o{ Subscriber : "has"
    User {
        string _id PK
        string email
        string password
        string role
        string persona
    }
    
    Subscriber ||--o{ Alert : "receives"
    Subscriber {
        string _id PK
        string userId FK
        string persona
        array subscribedGeofences
        object alertPrefs
    }
    
    Geofence ||--o{ Alert : "triggers"
    Geofence ||--o{ Detection : "contains"
    Geofence {
        string _id PK
        string name
        array coordinates
        string riskLevel
        number populationDensity
    }
    
    Drone ||--o{ Detection : "creates"
    Drone {
        string _id PK
        string name
        string model
        string status
        string patrollingType
        string networkSlice
    }
    
    Detection ||--|| Alert : "generates"
    Detection {
        string _id PK
        string droneId FK
        string type
        number confidence
        object location
        string status
    }
    
    Alert {
        string _id PK
        string type
        string severity
        string status
        array subscriberIds FK
        string geofenceId FK
        string droneId FK
        timestamp timestamp
    }
```