
import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbService {
  private dbConnection: typeof import("mongoose");

  constructor(private configService: ConfigService) {
    this.connect(); // קריאה לפונקציה connect בזמן בניית ה-SERVICE
  }

  async connect() {
    const uri = this.configService.get<string>('MONGODB_URI');    
    const options = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    try {
      this.dbConnection = await mongoose.connect(uri, options);
      const db =this.dbConnection.connection;      
      if (!db) {
        throw new Error('Failed to connect to database');
      }
      db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      db.once('open', function() {
        console.log('Connected to MongoDB');
      });
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  getConnection() {
    return this.dbConnection;
  }

  async disconnect() {
    if (this.dbConnection) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
}

