using System;

namespace SopZipImages
{
    public class SopZipImagesException : Exception
    {
        public SopZipImagesException()
        {
        }

        public SopZipImagesException(string message)
            : base(message)
        {
        }
    }
}
