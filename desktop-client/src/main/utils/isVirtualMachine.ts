import si from "systeminformation";

async function isVirtualMachine() {
    console.log("Checking for virtual machines!");

    const systemInfo = await si.system();
    if (systemInfo.virtual) {
        return true;
    }

    const vboxInfo = await si.vboxInfo();
    vboxInfo.filter((vboxInfoData) => vboxInfoData.running);
    if (vboxInfo.filter((vboxInfoData) => vboxInfoData.running).length !== 0) {
        return true;
    }

    return false;
}

export default isVirtualMachine;
