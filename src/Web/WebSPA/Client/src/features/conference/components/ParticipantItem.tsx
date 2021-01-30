import { ButtonBase, fade, makeStyles, Typography, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AnimatedMicIcon from 'src/assets/animated-icons/AnimatedMicIcon';
import IconHide from 'src/components/IconHide';
import { Roles } from 'src/consts';
import { selectParticipantProducers } from 'src/features/media/selectors';
import useMyParticipantId from 'src/hooks/useMyParticipantId';
import { RootState } from 'src/store';
import { ParticipantDto } from '../types';
import ParticipantContextMenuPopper from './ParticipantContextMenuPopper';

const useStyles = makeStyles((theme) => ({
   root: {
      marginLeft: theme.spacing(1),
   },
   button: {
      padding: theme.spacing(0, 1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      width: '100%',
      '&:hover': {
         textDecoration: 'none',
         backgroundColor: fade(theme.palette.text.primary, 0.05),
      },
   },
}));

type Props = {
   participant?: ParticipantDto;
};

export default function ParticipantItem({ participant }: Props) {
   const classes = useStyles();
   const producers = useSelector((state: RootState) => selectParticipantProducers(state, participant?.participantId));
   const myParticipantId = useMyParticipantId();

   const theme = useTheme();

   const [popperOpen, setPopperOpen] = useState(false);
   const buttonRef = useRef<HTMLButtonElement>(null);

   const handleClose = () => {
      setPopperOpen(false);
   };

   const handleToggle = () => {
      setPopperOpen((prevOpen) => !prevOpen);
   };

   return (
      <div className={classes.root}>
         <ButtonBase onClick={handleToggle} ref={buttonRef} component={motion.button} className={classes.button}>
            <Typography color={participant?.role === Roles.Moderator ? 'secondary' : undefined} variant="subtitle1">
               {participant ? participant?.displayName : <Skeleton />}
            </Typography>
            <IconHide hidden={!producers?.mic}>
               <AnimatedMicIcon activated={!producers?.mic?.paused} disabledColor={theme.palette.error.main} />
            </IconHide>
         </ButtonBase>
         {participant && participant.participantId !== myParticipantId && (
            <ParticipantContextMenuPopper
               open={popperOpen}
               onClose={handleClose}
               participant={participant}
               anchorEl={buttonRef.current}
            />
         )}
      </div>
   );
}