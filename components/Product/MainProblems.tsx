import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

interface DeclineInTLevelsProps {
  windowWidth: number;
}

const DeclineInTLevelsComponent: React.FC<DeclineInTLevelsProps> = ({ windowWidth }) => {
    const [issueNum, setIssueNum] = useState<number>(1);

    const setIssue = (num: number) => {
        setIssueNum(num);
    };

    // Slide Between Issues
    const changeIssue = (num: number) => {
        console.log(issueNum)
        if ((issueNum + num) > 4) {
            setIssue(1);
        } else if ((issueNum + num) < 1) {
            setIssue(4);
        } else {
            setIssue(issueNum + num);
        }
    };

    return (
    <div className={`${styles.col}`} style={{ width: '100%', padding: '4rem 0 4rem 0', background: "url('https://hitsdesignclients.com/Peak-Male-new/images/sec2.jpg') center bottom no-repeat" }}>
        <div className={styles.delcinedTestWrapper}>
            <h1 style={{color: "red", fontFamily: 'ApercuPro-Bold', textAlign: "center", fontSize: windowWidth < 720 ? "25px" : "50px", lineHeight:  windowWidth < 720 ? "30px" : "56px"}}> Decline In T-Levels In Men <br /> Is The Harsh Reality</h1>
            <p style={{color: "black", marginTop: "19px", textAlign: "center", fontSize: windowWidth < 720 ? "14px" : "18px", lineHeight: windowWidth < 720 ? "18px" : "26px"}}>
                Studies show that male testosterone levels have been steadily declining since the 1980's, <br className={styles.none} />
                impacting an entire generation of men around the world.
            </p>
            <h5 className={styles.s2subhding}>Some of the most common symptoms include</h5>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2line.png"} alt={""} height={5000} width={5000} className={`${styles.none} ${styles.s2line}`} />
            {windowWidth > 720 ? <ul className={styles.s2list}>
                <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img1.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Low Libido</h4>
                <p className={styles.s2ltxt}>Low libido, or a diminished sex drive, can impact your overall quality of life, confidence, and intimate relationships. It's a common issue often associated with low testosterone levels, stress, and various lifestyle factors.</p>
                </li>
                <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img2.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>All Day Fatigue</h4>
                <p className={styles.s2ltxt}>Constant fatigue can leave you feeling drained, unproductive, and disengaged from the activities you once enjoyed. It can stem from various factors, including low testosterone levels, stress, and poor lifestyle choices.</p>
                </li>
                <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img3.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Weight Gain</h4>
                <p className={styles.s2ltxt}>Unwanted weight gain can affect your self-esteem, physical appearance, and overall health, often resulting from hormonal imbalances, low testosterone levels, and lifestyle habits.</p>
                </li>
                <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img4.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Muscle Loss</h4>
                <p className={styles.s2ltxt}>Muscle loss can compromise your strength, athletic performance, and body composition, often occurring due to low testosterone levels, aging, and inadequate nutrition.</p>
                </li>
            </ul> : 
            <div className={styles.s2list}>
                {issueNum == 1 ? <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img1.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Low Libido</h4>
                <p className={styles.s2ltxt}>Low libido, or a diminished sex drive, can impact your overall quality of life, confidence, and intimate relationships. It's a common issue often associated with low testosterone levels, stress, and various lifestyle factors.</p>
                </li> : null}
                {issueNum == 2 ? <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img2.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>All Day Fatigue</h4>
                <p className={styles.s2ltxt}>Constant fatigue can leave you feeling drained, unproductive, and disengaged from the activities you once enjoyed. It can stem from various factors, including low testosterone levels, stress, and poor lifestyle choices.</p>
                </li> : null}
                {issueNum == 3 ? <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img3.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Weight Gain</h4>
                <p className={styles.s2ltxt}>Unwanted weight gain can affect your self-esteem, physical appearance, and overall health, often resulting from hormonal imbalances, low testosterone levels, and lifestyle habits.</p>
                </li> : null}
                {issueNum == 4 ? <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img4.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Muscle Loss</h4>
                <p className={styles.s2ltxt}>Muscle loss can compromise your strength, athletic performance, and body composition, often occurring due to low testosterone levels, aging, and inadequate nutrition.</p>
                </li> : null}

                <div className={styles.row} style={{width: "100%", justifyContent: "center", marginTop: "1rem"}}>
                    <div onClick={() => setIssue(1)} className={styles.col} style={{margin: "0 0.5rem", background: "white", border: "1px solid black", height: "15px", width: "15px", borderRadius: "100%"}}>
                    <div style={{background: issueNum == 1 ? "black" : "white", height: "10px", width: "10px", borderRadius: "100%"}}></div>
                    </div>
                    <div onClick={() => setIssue(2)} className={styles.col} style={{margin: "0 0.5rem", background: "white", border: "1px solid black", height: "15px", width: "15px", borderRadius: "100%"}}>
                    <div style={{background: issueNum == 2 ? "black" : "white", height: "10px", width: "10px", borderRadius: "100%"}}></div>
                    </div>
                    <div onClick={() => setIssue(3)} className={styles.col} style={{margin: "0 0.5rem", background: "white", border: "1px solid black", height: "15px", width: "15px", borderRadius: "100%"}}>
                    <div style={{background: issueNum == 3 ? "black" : "white", height: "10px", width: "10px", borderRadius: "100%"}}></div>
                    </div>
                    <div onClick={() => setIssue(4)} className={styles.col} style={{margin: "0 0.5rem", background: "white", border: "1px solid black", height: "15px", width: "15px", borderRadius: "100%"}}>
                    <div style={{background: issueNum == 4 ? "black" : "white", height: "10px", width: "10px", borderRadius: "100%"}}></div>
                    </div>
                </div>
                <button onClick={() => changeIssue(-1)} className={styles.issuePrev}></button>
                <button onClick={() => changeIssue(1)}  className={styles.issueNext}></button>
            </div> }

            <div className={`${styles.s2bx2} ${styles.row}`}>
                <img src={"https://hitsdesignclients.com/Peak-Male-new/images/s2prd.png"} alt={""}  className={styles.s2prd} />
            </div>
            <p className={`${styles.s2lhding2} ${styles.row}`}>
                This is why our team at Optimal Human created Peak Male – the most comprehensive male 
                vitality supplement on the market, dedicated to addressing key human health challenges by carefully formulating 
                targeted solutions with scientifically-backed ingredients.
            </p>
        </div>
    </div>
  );
};

export default DeclineInTLevelsComponent;
