export default function Home() {
    return (
        <div className="w-full h-full bg-red-400">
            <div className="w-full h-full grid place-items-center">
                <h1 className="text-3xl font-extrabold py-3">Bem vindo ao Cub's</h1>

                <img src="data:image/jpeg;base64,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" alt="" />

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    
                </p>
            </div>
        </div>
    );
}