import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store';
import { ProducerSource } from 'src/store/webrtc/types';
import { AnyInputDevice, InputDeviceDto } from './types';
import { EquipmentConnection } from '../media/types';

const getSource = (_: unknown, source: ProducerSource | undefined) => source;
export const selectLocalDevices = (state: RootState) => state.settings.availableDevices;
export const selectEquipmentConnections = (state: RootState) => state.media.equipment?.connections;

export const selectAvailableInputDevicesFactory = () =>
   createSelector(selectLocalDevices, selectEquipmentConnections, getSource, (devices : InputDeviceDto[] | null, equipment: Record<string, EquipmentConnection> | undefined, source: ProducerSource | undefined) => {
      const result = new Array<DeviceGroup>();

      if (devices) {
         const localDevices = devices
            .filter((x) => x.source === source)
            .map<DeviceViewModel>((x) => ({ label: x.label, device: { type: 'local', deviceId: x.deviceId } }));

         result.push({
            type: 'local',
            devices: localDevices,
         });
      }

      if (equipment) {
         for (const connected of Object.values(equipment)) {
            if (connected.devices?.length > 0)
               result.push({
                  type: 'equipment',
                  equipmentName: connected.name,
                  connectionId: connected.connectionId,
                  devices: connected.devices
                     .filter((x) => x.source === source)
                     .map((x) => ({
                        label: x.label,
                        device: { type: 'equipment', deviceId: x.deviceId, connectionId: connected.connectionId },
                     })),
               });
         }
      }

      return result;
   });

export const selectIsDeviceAvailableFactory = () => {
   const availableDevicesSelector = selectAvailableInputDevicesFactory();

   return createSelector(availableDevicesSelector, getSource, (devices: any) => {
      return Boolean(devices.find((x: any) => x.devices.length > 0));
   });
};

export const selectEnableVideoOverlay = (state: RootState) => state.settings.obj.diagnostics.enableVideoOverlay;

export type DeviceGroup = EquipmentDeviceGroup | LocalDeviceGroup;

export type EquipmentDeviceGroup = {
   type: 'equipment';
   connectionId: string;
   equipmentName?: string;
   devices: DeviceViewModel[];
};

export type LocalDeviceGroup = {
   type: 'local';
   devices: DeviceViewModel[];
};

export type DeviceViewModel = {
   device: AnyInputDevice;
   label?: string;
};