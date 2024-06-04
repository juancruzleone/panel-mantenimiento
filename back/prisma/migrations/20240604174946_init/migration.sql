-- CreateTable
CREATE TABLE "Edificio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "codigoPostal" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,

    CONSTRAINT "Edificio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instalacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoInstalacion" TEXT NOT NULL,
    "edificioId" INTEGER NOT NULL,
    "propietarioId" INTEGER NOT NULL,

    CONSTRAINT "Instalacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "codigoQR" TEXT NOT NULL,
    "instalacionId" INTEGER NOT NULL,

    CONSTRAINT "Dispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propietario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Propietario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_codigoQR_key" ON "Dispositivo"("codigoQR");

-- AddForeignKey
ALTER TABLE "Instalacion" ADD CONSTRAINT "Instalacion_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instalacion" ADD CONSTRAINT "Instalacion_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "Propietario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_instalacionId_fkey" FOREIGN KEY ("instalacionId") REFERENCES "Instalacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
