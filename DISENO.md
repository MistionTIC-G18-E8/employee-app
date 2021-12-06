# Diseño de la aplicación

## Base de datos

Las siguientes **colecciones** estarán presentes en la base de datos.

### Usuarios (User)

Usuarios que pueden entrar a la plataforma, se deben definir los permisos y la relación con los usuarios.

El manejo de los permisos será con un field number, `permission` que representará: 0 para sudo, 1 para admin, 5 para nómina, 10 para empleado. Cada documento debe tener un número de permiso mínimo necesario para leer, editar y escribir; lo que determinará si se puede o no leer.

Campos:
    - username
    - email
    - employee
    - salth
    - hash
    - permission

### Empleado (Employee)

Campos:
    - first_name
    - last_name
    - email
    - address
    - gender
    - joined_at
    - left_at
    - contract
    - jobtitle
    - department

### Contrato (Contract)

Campos:
    - daily_rate
    - monthly_rate
    - employee
    - start
    - end

### Recibo de Pago (Payslip)

Campos:
    - amount
    - days
    - days_not
    - contract
    - employee
    - start
    - end

### Solicitudes (EmployeeRequest)

Campos:
    - Empleado
    - Fecha
    - Estado
    - Revisado por
    - Remunerado
    - Tipo
