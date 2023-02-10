import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = useContext(Context)

    return (
        <div className={"phone__list flex"}>
            {
                device.devices.map(device =>
                    <DeviceItem key={device.id} deviceBrandId={device.brandId} device={device}/>
                )
            }
        </div>
    );
});

export default DeviceList;