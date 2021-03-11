import { makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { DateTime } from 'luxon';
import emojiRegex from 'emoji-regex/RGI_Emoji';
import clsx from 'classnames';
import { hashCode, numberToColor } from '../color-utils';
import { Participant } from 'src/features/conference/types';
import { ChatMessageDto } from 'src/core-hub.types';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexDirection: 'column',

      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: 4,
      paddingBottom: 4,
   },
   metaData: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   messageText: {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      fontSize: 14,
   },
   emojiText: {
      fontSize: 20,
   },
   senderText: {
      flex: 1,
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      marginRight: theme.spacing(1),
   },
   senderTextAnonymous: {
      color: theme.palette.text.secondary,
   },
   senderTextPrivate: {
      color: theme.palette.primary.main,
   },
   disconnectedText: {
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(1),
   },
}));

const onlyEmojisRegex = new RegExp('^(' + emojiRegex().toString().replace(/\/g$/, '') + '|\\s)+$');

type Props = {
   message?: ChatMessageDto;
   participants?: Participant[] | null;
   participantId?: string;
   participantColors: { [id: string]: string };
};

export default function ChatMessage({ message, participants, participantId, participantColors }: Props) {
   const classes = useStyles();
   const isEmoji = message && message.message.length <= 8 && onlyEmojisRegex.test(message.message);
   const sender = message?.sender && participants?.find((x) => x.id === message.sender?.participantId);

   const isAnonymous = message && !message.sender;
   const isDisconnected = message?.sender && !sender;
   const isFromMe = message?.sender?.participantId === participantId;

   const participantColor = useMemo(
      () =>
         message?.sender &&
         (participantColors[message.sender.participantId] ?? numberToColor(hashCode(message.sender.participantId))), // numberToColor for participants that just disconnected
      [message?.sender?.participantId],
   );

   return (
      <li className={classes.root} style={{ opacity: isDisconnected ? 0.8 : undefined }}>
         <div className={classes.metaData}>
            <Typography
               variant="caption"
               style={{ color: participantColor }}
               className={clsx(classes.senderText, {
                  [classes.senderTextAnonymous]: isAnonymous,
               })}
            >
               {renderSender(message, sender, isAnonymous)}
               {isDisconnected && <span className={classes.disconnectedText}>(Disconnected)</span>}
            </Typography>
            <Typography variant="caption" color="textSecondary">
               {message ? (
                  DateTime.fromISO(message.timestamp).toLocaleString(DateTime.TIME_24_SIMPLE)
               ) : (
                  <Skeleton width={36} />
               )}
            </Typography>
         </div>
         <Typography variant="body1" className={clsx(classes.messageText, isEmoji && classes.emojiText)}>
            {message ? message.message : <Skeleton />}
         </Typography>
      </li>
   );
}

function renderSender(message?: ChatMessageDto, sender?: Participant, isAnonymous?: boolean) {
   if (message?.sender) {
      return sender?.displayName ?? message.sender.meta.displayName;
   }

   if (isAnonymous) {
      return 'Anonymous';
   }

   return <Skeleton />;
}