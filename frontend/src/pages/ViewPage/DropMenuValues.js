
const DropOptions = {}

DropOptions.queryOptions = [
    {
        key: '1',
        text: 'Primer Apellido',
        value: '1'
    },
    {
        key: '2',
        text: 'Segundo Apellido',
        value: '2'
    },
    {
        key: '3',
        text: 'Primer Nombre',
        value: '3'
    },
    {
        key: '4',
        text: 'Otros Nombres',
        value: '4'
    },
    {
        key: '5',
        text: 'N° Identificación',
        value: '5'
    },
    {
        key: '6',
        text: 'Correo',
        value: '6'
    }
]

DropOptions.countryOptions = [
    {
        key: 'Todos',
        text: 'Todos',
        value: 'Todos',
        image: { avatar: true, src: 'https://cdn.website.thryv.com/e0fa5db2c0a64a16ae6d76230bd17c85/dms3rep/multi/117.png' },

    },
    {
        key: 'Colombia',
        text: 'Colombia',
        value: 'Colombia',
        image: { avatar: true, src: 'https://cdn.countryflags.com/thumbs/colombia/flag-round-250.png' },
    },
    {
        key: 'Estados Unidos',
        text: 'Estados Unidos',
        value: 'Estados Unidos',
        image: { avatar: true, src: 'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-round-250.png' },
    }
]

DropOptions.IDOptions = [
    {
        key: 'Todos',
        text: 'Todos',
        value: 'Todos'
    },
    {
        key: 'Cédula',
        text: 'Cédula',
        value: 'Cédula'
    },
    {
        key: 'Lic.Conducción',
        text: 'Lic.Conducción',
        value: 'Lic.Conducción'
    },
    {
        key: 'Pasaporte',
        text: 'Pasaporte',
        value: 'Pasaporte'
    }
]

DropOptions.StateOptions = [
    {
        key: 'Todos',
        text: 'Todos',
        value: 'Todos'
    },
    {
        key: 'activo',
        text: 'activo',
        value: 'activo'
    },
    {
        key: 'desvinculado',
        text: 'desvinculado',
        value: 'desvinculado'
    }
]


export default DropOptions;