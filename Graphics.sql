create table Client(
	Id int primary key Identity(1,1),
	Nom nvarchar(50) not null,
	Contact nvarchar(50) not null,
	Adresse nvarchar(30),
	)
go
create table Users(
	Id int primary key Identity(1,1),
	Nom nvarchar(50) not null,
	Service nvarchar(50) not null,
	Email nvarchar(100) not null unique,
	MotDePasse nvarchar(255) not null,
	DateRealisation datetime2(7),
	)
go

create table ODF(
	Id int primary key Identity(1,1),
	NumDossier nvarchar(25) not null,
	DateOuvertureDossier datetime2(7),
	DateEntreeCreation datetime2(7),
	NumCreation nvarchar(25),
	Qtecommandee int not null,
	QteLivree int not null,
	DateLivraison datetime2(7),
	Designation nvarchar(25),
	DateOuvertureDossier datetime2(7),
	NumUsine int,
	Observation nvarchar(255),
	MontantHT int ,
	MontantNetHT int,
	MontantTTC int,
	TVA decimal(18,2) null default 0,
	TTC  decimal(18,2) null default 0,
	TSP decimal(18,2) null default 0,
	Remise decimal(18,2) null default 0,
	IdClient int not null constraint fk_ODF_Client
	foreign key (IdClient) references Client(Id),
	IdUsers int not null constraint fk_ODF_Users
	foreign key(IdUsers) references Users(Id),
	)
go
create table Activite(
	Id int primary key Identity(1,1),
	Nom nvarchar(50) not null,
	Description nvarchar(255),
	Montant int not null default(0),
	DateRealisation datetime2(7),
	foreign key (IdEtapesProduction) references EtapesProduction(Id),
	)
go

	create table Operation(
	Id int primary key Identity(1,1),
	Nom nvarchar(25),
	DateRealisation datetime2(7) not null default getdate(),
	Observation varchar,
	IdOperationMatiere int constraint fk_Operation_OperationMatiere
	foreign key (IdOperationMatiere) references OperationMatiere(Id),
	)
go
create table Matiere(
	Id int primary key Identity(1,1),
	Nom nvarchar(50) not null,
	Format nvarchar(30) not null,
	PrixUnitaire int not null default (0),
	Quantite int not null default(0),
	Montant int  default(0),
	)
go

create table OperationMatiere(
	Id int primary key Identity(1,1),
	Nom nvarchar(50) not null,
	DateRealisation datetime2(7) not null default getdate(),
	IdEtapesProduction int not null constraint fk_OperationMatiere_EtapesProduction
	foreign key (IdEtapesProduction) references EtapesProduction(Id),
)
go

create table EtapesProduction(
	Id int primary key Identity(1,1),
	Nom nvarchar(50) not null,
	DateRealisation datetime2(7) not null default getdate(),
	TVA decimal(18,2) null default 0,
	TTC decimal(18,2) null default 0,
	TSP decimal(18,2) null default 0,
	Precompte decimal(18,2) null default 0,
	Remise decimal(18,2) null default 0,
	IdODF int not null constraint fk_EtapesProduction_ODF foreign key (IdODF) references ODF(Id),
	IdActivite int not null constraint fk_EtapesProduction_Activite
	foreign key (IdActivite) references Activite(Id),
	)
go

create table MatiereUtiliser(
	Id int primary key Identity(1,1),
	IdOperationMatiere int not null,
	IdMatiere int not null,
	PrixUnitaire int not null default (0),
	Quantite int not null default(0),
	constraint UQ_IdOperationMatiere_IdMatiere unique (IdOperationMatiere,IdMatiere),
	constraint FK_IdOperationMatiere foreign key (IdOperationMatiere) references OperationMatiere(Id),
	constraint FK_IdMatiere foreign key (IdMatiere) references Matiere(Id),
	)
go
	




	

	 