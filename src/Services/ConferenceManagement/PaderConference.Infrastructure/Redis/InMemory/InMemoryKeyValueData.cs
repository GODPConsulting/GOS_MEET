﻿using System.Collections.Generic;
using Nito.AsyncEx;

namespace PaderConference.Infrastructure.Redis.InMemory
{
    public class InMemoryKeyValueData
    {
        public readonly AsyncLock Lock = new();
        public readonly Dictionary<string, object> Data = new();
    }
}