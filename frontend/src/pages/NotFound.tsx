function NotFound() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center mx-auto bg-no-repeat bg-center bg-[url('/assets/tomato-background.jpg')] bg-[length:70%] pb-12">
      <div className="flex flex-col gap-4">
        <p className="text-4xl md:text-6xl font-bold">Oops! PAGE NOT FOUND</p>
        <h3 className="text-2xl md:text-4xl font-bold">
          WE ARE SORRY. BUT THE PAGE YOU REQUESTED WAS NOT FOUND
        </h3>
      </div>
    </main>
  )
}

export default NotFound
