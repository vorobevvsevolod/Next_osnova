import styles from '../app/scss/notFound.module.scss'
import categoryStyles from '../app/(categoryPages)/categoryPages.module.scss'
import Link from "next/link";
import Image from "next/image";
export default async function Custom404() {

    return (
        <div className={styles.notfound}>
            <div className={styles.notfound_container}>
                <div className={categoryStyles.categoryPages_titleCenter}>УПС! Такой страницы не существует...</div>
                <Image src={'/img/404.jpg'} alt={'404'} width={400} height={400} className={styles.notfound_container_img}/>
                <Link href={'/'} className={categoryStyles.categoryPages_btnLink} style={{width: '100%'}}>
                    <div className={categoryStyles.categoryPages_btnLink_text}>На главную</div>
                </Link>

            </div>
        </div>
    )
}