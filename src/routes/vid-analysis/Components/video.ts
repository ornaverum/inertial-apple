import cv from 'opencv.js';

export const getGrayScale = async (req: Request, res: Response) => {
    try {
        const { videoUrl } = req.body;
        const video = await getVideo(videoUrl);
        const grayScaleVideo = await getGrayScaleVideo(video);
        res.send(grayScaleVideo);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getGrayScaleVideo = async (video: any) => {
    const grayScaleVideo = new cv.VideoCapture(video);
    return grayScaleVideo;
}