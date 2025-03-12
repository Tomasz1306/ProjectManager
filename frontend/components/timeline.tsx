import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import StartIcon from '@mui/icons-material/Start';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FlagIcon from '@mui/icons-material/Flag';

import BatteryCharging20SharpIcon from '@mui/icons-material/BatteryCharging20Sharp';
import BatteryCharging60SharpIcon from '@mui/icons-material/BatteryCharging60Sharp';
import BatteryChargingFullSharpIcon from '@mui/icons-material/BatteryChargingFullSharp';
export default function OppositeContentTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          
        </TimelineOppositeContent>
        <TimelineSeparator>
          <BatteryCharging20SharpIcon fontSize='large' className=" text-red-500" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Start</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          
        </TimelineOppositeContent>
        <TimelineSeparator>
          <BatteryCharging60SharpIcon fontSize='large' className=" text-white-500"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Working</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          
        </TimelineOppositeContent>
        <TimelineSeparator>
          <BatteryChargingFullSharpIcon fontSize='large' className=" text-green-500" />
        </TimelineSeparator>
        <TimelineContent>Finish</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
