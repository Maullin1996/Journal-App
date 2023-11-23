import { fileUpload } from "../../src/helper/fileUpload"
 
describe('Pruebas en fileUpload', () => {
    test('Debe de subir correctamente el archivo a cloudinary', async() => {
        const imageUrl = 'https://www.shutterstock.com/image-illustration/abstract-wave-technology-background-blue-260nw-2152448863.jpg'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jgp');
 
        const url = await fileUpload( file );
        expect( typeof url ).toBe('string')
    })
})