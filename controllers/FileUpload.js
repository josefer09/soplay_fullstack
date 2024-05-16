

// Confirmar si el folder existe
const  checkFolder = (folderPath) => {
    // Si no existe el folder path, entonces crearemos el folderPath
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

export const uploadSingle = async (
    file,
    folder = "uploads",
    validExtensions = ["png", "jpg", "jpeg", "gif", "jfif"]
  ) => {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? ''; // en la segunda posicion por ser arreglo

      if( !validExtensions.includes(fileExtension)) {
        throw new Error("Error en uploadSingle");
      }
      const destination = path.resolve(__dirname, "../../../", folder);
      checkFolder(destination);
      // crear el nombre del archivo
      const fileName = `${ Date.now() }.${ fileExtension }`;
      // Vamos a colocarlo
      file.mv(`${destination}/${ fileName }`);
      return {fileName};
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  export const uploadFile = (req, res) => {
    const file = req.body.files[0];


       uploadSingle(file, `uploads/`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => console.log(error));
  };