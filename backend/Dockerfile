FROM python:3.9-slim-buster
# copy work dir 
COPY backend /app
# set work dir 
WORKDIR /app
# install dependencies
RUN pip install --no-cache-dir -r requirements.txt
# expose port
EXPOSE 8000
# run app
CMD ["python", "app.py"]