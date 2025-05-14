//database logic

const { PrismaClient } = require("@prisma/client");
const generateDeviceId = require("../utils/generateDeviceId");

const prisma = new PrismaClient();

exports.checkIn = async ({ assocId, PPM_barcode, PPM_written, imageUrl }) => {
    const deviceId = generateDeviceId();

    await prisma.applianceIn.create({
        data: {
            deviceId,
            assocId,
            PPM_barcode,
            PPM_written,
            imageUrl,
        },
    });

    //dummy vals
    const dummyAttributes = [
        { attribute: "SerialNumber", value: `SN-${Math.floor(Math.random() * 100000)}` },
        { attribute: "PrimaryVoltage", value: "120V" },
        { attribute: "SecondaryVoltage", value: "24V" },
      ];

    //create EAV table based on dummy vals
    for (const attr of dummyAttributes){
        await prisma.appDetails.create({
            data: {
                deviceId,
                attribute: attr.attribute,
                value: attr.value,
            },
        });
    }

    return deviceId;
}