import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';
import { Copy, Facebook, Linkedin, Send, Twitter, MessageCircle } from 'lucide-react';
import DiscordIcon from '@/components/icons/DiscordIcon';

const SocialShareButtons = ({ url, title }) => {
  const { t } = useTranslation('blog');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: t('copyLink.successTitle'),
      description: t('copyLink.successDescription'),
    });
  };

  const shareButtons = [
    {
      name: 'Twitter',
      Component: TwitterShareButton,
      Icon: Twitter,
      props: { url, title },
      colorClass: 'hover:bg-[#1DA1F2] hover:text-white'
    },
    {
      name: 'Facebook',
      Component: FacebookShareButton,
      Icon: Facebook,
      props: { url, quote: title },
      colorClass: 'hover:bg-[#1877F2] hover:text-white'
    },
    {
      name: 'LinkedIn',
      Component: LinkedinShareButton,
      Icon: Linkedin,
      props: { url, title },
      colorClass: 'hover:bg-[#0A66C2] hover:text-white'
    },
    {
      name: 'Telegram',
      Component: TelegramShareButton,
      Icon: Send,
      props: { url, title },
      colorClass: 'hover:bg-[#2AABEE] hover:text-white'
    },
    {
      name: 'WhatsApp',
      Component: WhatsappShareButton,
      Icon: MessageCircle,
      props: { url, title, separator: ':: ' },
      colorClass: 'hover:bg-[#25D366] hover:text-white'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <motion.div 
        className="flex justify-center items-center flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {shareButtons.map((item) => (
          <motion.div key={item.name} variants={itemVariants}>
            <item.Component {...item.props}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-secondary text-foreground transition-colors duration-300 ${item.colorClass}`}>
                <item.Icon size={22} />
              </div>
            </item.Component>
          </motion.div>
        ))}
         <motion.div variants={itemVariants}>
            <button onClick={copyToClipboard} title="Share on Discord">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary text-foreground transition-colors duration-300 hover:bg-[#5865F2] hover:text-white">
                <DiscordIcon className="w-6 h-6" />
              </div>
            </button>
        </motion.div>
        <motion.div variants={itemVariants}>
            <button onClick={copyToClipboard} title={t('copyLink.title')}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary text-foreground transition-colors duration-300 hover:bg-primary hover:text-white">
                 <Copy className="w-5 h-5" />
              </div>
            </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SocialShareButtons;