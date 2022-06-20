drop table if exists pets;

create table pets (
    id bigint unsigned auto_increment primary key,
    name varchar(255) not null,
    age int null,
    size enum('x-small', 'small', 'medium', 'large', 'x-large') null
);

insert into pets (name, age, size) values ('Mami', 4, 'large');
insert into pets (name, age, size) values ('Grazia', 3, 'medium');
