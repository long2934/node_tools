const pfxPath = process.env.PFX_FILENAME;
const pfxPassword = process.env.PFX_PASSWORD;
const pemPath = process.env.PEM_FILENAME;
const PfxToPem = require('pfx-to-pem');

const logger = require('../utils/logger').logger;
const common = require('../utils/common');
const fs = require('fs');
const { STATUS } = require('../utils/constant');

const toolsController = {
    pfx2pem: async (req, res) => {
        const cert = await PfxToPem.toPem({
            path: pfxPath,
            password: pfxPassword
        });
        //show certification id
        logger.info('Certification ID:' + common.h2d(cert.attributes.serial));
        //write pem file
        fs.writeFile(pemPath, cert.key, function(err) {
            if(err) {
                return console.log(err);
            }
            logger.info("pem file was saved!");
        }); 
        let resResult={
            
        };
        resResult['result'] = STATUS.OK;
        return common.createRes(resResult, res);

    }
}

module.exports = toolsController;