import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import styles from './MobileNavigation.module.css';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

// const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']

export const MenuLink = ({ text, path, icon, goBackIcon, onClick, width }) => {
  return (
    <>
      <Link href={`${path ? path : "#"}`}>
        <motion.li
          style={{ width }}
          onClick={onClick}
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={styles.menuList}
        >
          {goBackIcon && <ChevronLeftRoundedIcon fontSize='large' />}
          {text}
          {icon && <ChevronRightRoundedIcon fontSize='large' />}
        </motion.li>
      </Link>
    </>
  )
}