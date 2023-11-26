import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helper/fileUpload"
//Pasos para eliminar imagen 1/2
cloudinary.config({
    cloud_name: 'dens4xsgg',
    api_key: '533224872955676',
    api_secret: '6_dvziNMRqT6EbdnfytdJDsbqoQ',
    secure: true
})

describe('Pruebas en fileUpload', () => {
    test('Debe de subir correctamente el archivo a cloudinary', async() => {
        const imageUrl = 'https://www.shutterstock.com/image-illustration/abstract-wave-technology-background-blue-260nw-2152448863.jpg'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jgp');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        //Pasos para eliminar imagen 2/2
        //console.log(url);
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');
        //console.log(imageId);

        const cloudResp = await cloudinary.api.delete_resources([ 'Journal-App/' + imageId ], {
            resource_type: 'image'
        });
        //console.log({ cloudResp })
    });
    test('Debe de retornar null', async() => {

        const file = new File([], 'foto.jgp');

        const url = await fileUpload( file );
        expect( url ).toBe(null);

    });
})