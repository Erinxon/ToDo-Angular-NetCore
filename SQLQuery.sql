create database ToDoDb
use ToDoDb
go
create table Users
(
 UserId UNIQUEIDENTIFIER primary key default NEWID(),
 FirstName varchar(100) not null,
 LastName varchar(100) not null,
 TypeUser int not null,
 Email varchar(250) not null unique,
 Password varchar(256) not null,
 Status bit default 1,
 CreateDate datetime default GetDate()
)
go
create table ToDo
(
  ToDoId UNIQUEIDENTIFIER primary key default NEWID(),
  Name varchar(100) not null,
  Description varchar(250) null,
  Done bit default 0 not null,
  UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserId) not null,
  CreateDate datetime default GetDate() not null
)

insert into Users(FirstName, LastName, TypeUser, Email, Password) 
values('Erinxon','Santana',1,'erinxons@gmail.com','123456')

insert into ToDo(Name, Description, UserId)
values('Compra del Mes','Ir al bravo a comprar los alimentos que se van a consumir en el mes de enero','E398C0AA-F147-4892-8CFB-6111C2CFDC0F')

create view View_Todo
as
select T.*,U.FirstName,U.LastName from ToDo as T
inner join Users as U on T.UserId = U.UserId



create procedure Sp_GetToDo
@UserId UNIQUEIDENTIFIER = null,
@PageNumber int = 1,
@PageSize int = 10,
@Type int = 0
as
begin
    DECLARE @SkipRows int = (@PageNumber - 1) * @PageSize

	if(@Type = 0)
	begin
		select * from View_Todo
		order by CreateDate asc
		OFFSET @SkipRows ROWS 
		FETCH NEXT @PageSize ROWS ONLY
	end
	else
	begin
		select * from View_Todo where UserId = @UserId
		order by CreateDate asc
		OFFSET @SkipRows ROWS 
		FETCH NEXT @PageSize ROWS ONLY
	end
end

create view View_User
as
select * from Users

create procedure Sp_Login
@Email varchar(250),
@Password varchar(256)
as
begin
	select * from View_User where Email = @Email and Password = @Password
end

select * from ToDo
where TodoId = CAST('3fa85f64-5717-4562-b3fc-2c963f66afa6' as UNIQUEIDENTIFIER)

declare @count int = 0
WHILE(@count <= 500) BEGIN
	insert into ToDo(Name, Description, UserId)
	values('Task: ' + CAST(@count as varchar(100)),'Task: ' + CAST(@count as varchar(100)),'c3a0cb1c-2092-43ab-9ed5-dea181dc12e5')
    set @count = @count + 1
END
