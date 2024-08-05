async function main() {
    console.log('Hello World');
}

main().then(() => {
    console.log('xxxxx Done xxxxx');
}).catch((error) => {
    console.error(error);
});