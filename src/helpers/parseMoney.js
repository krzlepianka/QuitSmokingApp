export default function parseMoney(num) {
    try {
        if(!num || typeof num != 'number') {
            throw new Error('do funkcji nie została przekazana wartość, lub przekazana wartość nie jest liczbą')
        }
        return num.toFixed(2);
    }
    catch(error) {
        console.log(error);
    }
}